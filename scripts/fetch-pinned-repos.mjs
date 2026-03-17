#!/usr/bin/env node
/**
 * Fetches pinned repositories from GitHub GraphQL API and writes to
 * src/data/pinned-repos.json. Run automatically as part of the build.
 *
 * Requires GITHUB_TOKEN env var (automatically set in GitHub Actions).
 * If no token is present, writes an empty array so the build still succeeds.
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "../src/data/pinned-repos.json");
const USERNAME = "IdanKoblik";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.log("No GITHUB_TOKEN found — writing empty pinned repos.");
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, "[]\n");
  process.exit(0);
}

const query = `
  query {
    user(login: "${USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            primaryLanguage { name }
            stargazerCount
            forkCount
          }
        }
      }
    }
  }
`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  },
  body: JSON.stringify({ query }),
});

if (!res.ok) {
  console.error(`GitHub API error: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const { data, errors } = await res.json();
if (errors) {
  console.error("GraphQL errors:", errors);
  process.exit(1);
}

const repos = (data.user.pinnedItems.nodes ?? []).map((r) => ({
  name: r.name,
  description: r.description ?? "",
  url: r.url,
  language: r.primaryLanguage?.name ?? "Unknown",
  stars: r.stargazerCount,
  forks: r.forkCount,
}));

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(repos, null, 2) + "\n");
console.log(`Wrote ${repos.length} pinned repos to src/data/pinned-repos.json`);
