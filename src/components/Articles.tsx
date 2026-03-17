import { Link } from "react-router-dom";
import { articles } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

const Articles = () => {
  if (articles.length === 0) return null;

  return (
    <section id="articles" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          <span className="text-primary">#</span> Articles
        </h2>
        <p className="text-muted-foreground mb-10 font-body">
          Thoughts on software engineering and open source.
        </p>

        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group bg-card border border-border rounded-lg p-5 glow-card flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-sm text-muted-foreground font-body">
                    {article.description}
                  </p>
                )}
                {article.date && (
                  <p className="text-xs text-muted-foreground mt-2 font-body">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
              <ArrowRight
                size={16}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
