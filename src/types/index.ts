export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug: string;
}

export interface CVLink {
  language: string;
  url: string;
  flag: string;
}
