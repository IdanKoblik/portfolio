import { useEffect, useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { GitHubRepo } from '../types';
import { fetchPortfolioProjects } from '../services/github';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchPortfolioProjects();
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Projects
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Featured Work
        </h3>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl">
          A collection of projects I've built, ranging from backend services to developer tools.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">
              No portfolio projects found. Make sure to tag your GitHub repositories with "portfolio".
            </p>
            <p className="text-sm text-gray-500">
              Go to your repository → Settings → Topics → Add "portfolio"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-900 transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {project.name}
                  </h4>
                  {project.stargazers_count > 0 && (
                    <div className="flex items-center gap-1 text-gray-500">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{project.stargazers_count}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4 flex-grow leading-relaxed">
                  {project.description || 'No description provided'}
                </p>

                {project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {project.language && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      {project.language}
                    </span>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
