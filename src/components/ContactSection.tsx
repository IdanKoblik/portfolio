import { Mail, Linkedin, Github } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export default function ContactSection() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: portfolioConfig.social.linkedin,
      icon: Linkedin,
      color: 'hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600',
    },
    {
      name: 'GitHub',
      url: portfolioConfig.social.github,
      icon: Github,
      color: 'hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900',
    },
    {
      name: 'Email',
      url: `mailto:${portfolioConfig.social.email}`,
      icon: Mail,
      color: 'hover:bg-red-50 hover:border-red-500 hover:text-red-600',
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Get In Touch
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Let's Connect
        </h3>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl">
          I'm always interested in hearing about new projects, opportunities, or just having a chat
          about backend development and system architecture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center justify-center p-8 bg-white rounded-xl border-2 border-gray-200 transition-all duration-300 ${link.color}`}
              >
                <Icon className="w-8 h-8 mb-4" />
                <span className="font-semibold">{link.name}</span>
              </a>
            );
          })}
        </div>

        {portfolioConfig.social.discord && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Discord</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Let’s chat on Discord to discuss.
                </p>
                <a
                  href={portfolioConfig.social.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Click on me →
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Available for freelance projects and consulting opportunities</p>
        </div>
      </div>
    </section>
  );
}
