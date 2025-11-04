import { useState } from 'react';
import Navigation from './components/Navigation';
import AboutSection from './components/AboutSection';
import CVSection from './components/CVSection';
import ProjectsSection from './components/ProjectsSection';
import ArticlesSection from './components/ArticlesSection';
import ContactSection from './components/ContactSection';
import ArticleView from './components/ArticleView';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'article'>('home');
  const [selectedArticle, setSelectedArticle] = useState<string>('');

  const handleArticleClick = (slug: string) => {
    setSelectedArticle(slug);
    setCurrentView('article');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedArticle('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentView={currentView} />

      {currentView === 'home' ? (
        <>
          <AboutSection />
          <CVSection />
          <ProjectsSection />
          <ArticlesSection onArticleClick={handleArticleClick} />
          <ContactSection />
        </>
      ) : (
        <ArticleView slug={selectedArticle} onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;
