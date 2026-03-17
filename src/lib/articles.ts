export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface Article extends ArticleMeta {
  body: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return { meta, body: match[2] };
}

const modules = import.meta.glob("/src/content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const articles: Article[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.replace(/^.*\/(.+)\.md$/, "$1");
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      description: meta.description ?? "",
      body,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));
