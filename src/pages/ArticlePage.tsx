import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { articles } from "@/lib/articles";
import { ArrowLeft } from "lucide-react";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground font-body">Article not found.</p>
        <Link to="/" className="text-sm text-primary hover:underline font-display">
          ← Back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Link
          to="/#articles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-display mb-10"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <header className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            {article.title}
          </h1>
          {article.date && (
            <p className="text-sm text-muted-foreground font-body">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </header>

        <div className="prose prose-invert prose-sm md:prose-base max-w-none font-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
