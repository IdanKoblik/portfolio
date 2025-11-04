import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { fetchArticles } from '../services/articles';

interface ArticlesSectionProps {
  onArticleClick: (slug: string) => void;
}

export default function ArticlesSection({ onArticleClick }: ArticlesSectionProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      const data = await fetchArticles();
      setArticles(data);
      setLoading(false);
    }
    loadArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="articles" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gray-50">
      <div className="max-w-6xl w-full">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Articles
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Technical Writing
        </h3>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl">
          Sharing knowledge and experiences from building backend systems at scale. Deep dives into
          architecture, performance optimization, and best practices.
        </p>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-xl border border-gray-200 p-8 hover:border-gray-900 transition-all duration-300 hover:shadow-lg cursor-pointer"
                onClick={() => onArticleClick(article.slug)}
              >
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>

                <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {article.title}
                </h4>

                <div className="flex items-center gap-2 text-gray-900 font-medium group-hover:gap-3 transition-all">
                  Read full article
                  <ArrowRight className="w-4 h-4" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
