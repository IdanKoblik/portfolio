import { GitHubRepo } from '../types';
import { portfolioConfig } from '../config/portfolio';

export async function fetchPortfolioProjects(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${portfolioConfig.github.username}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }

    const repos: GitHubRepo[] = await response.json();

    const portfolioRepos = repos.filter((repo) =>
      repo.topics.includes(portfolioConfig.github.portfolioTag)
    );

    return portfolioRepos.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}
