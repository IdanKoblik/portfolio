import { portfolioConfig } from '../config/portfolio';
import ExperienceTimeline from './ExperienceTimeline';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          About Me
        </h2>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          {portfolioConfig.name}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          {portfolioConfig.title}
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl">
          {portfolioConfig.bio}
        </p>

        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What I Enjoy Building
          </h3>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Experience
            </h3>
            <span className="text-2xl font-bold text-gray-900">{portfolioConfig.experience}</span>
          </div>
          <ExperienceTimeline experiences={portfolioConfig.experiences} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-3">
            {portfolioConfig.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
