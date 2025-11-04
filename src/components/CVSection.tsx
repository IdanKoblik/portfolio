import { Download } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export default function CVSection() {
  return (
    <section id="cv" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gray-50">
      <div className="max-w-4xl w-full">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          My CV
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Resume
        </h3>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl">
          Download my CV. includes my complete work history,
          technical skills, and project highlights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioConfig.cv.map((cv) => (
            <a
              key={cv.language}
              href={cv.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{cv.flag}</span>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    {cv.language}
                  </h4>
                  <p className="text-sm text-gray-500">PDF Format</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-900 transition-colors">
                <Download className="w-5 h-5" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">Note:</strong> If you prefer to view my CV online or need
            it in a different format, feel free to reach out via the contact section below.
          </p>
        </div>
      </div>
    </section>
  );
}
