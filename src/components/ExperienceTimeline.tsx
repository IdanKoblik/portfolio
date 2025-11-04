import { Experience } from '../config/portfolio';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const sortedExperiences = [...experiences].sort((a, b) => {
    const aDate = new Date(a.startDate);
    const bDate = new Date(b.startDate);
    return bDate.getTime() - aDate.getTime();
  });

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getDateRange = (startDate: string, endDate: string | null): string => {
    const start = formatDate(startDate);
    if (!endDate) return `${start} — Present`;
    return `${start} — ${formatDate(endDate)}`;
  };

  return (
    <div className="space-y-8">
      {sortedExperiences.map((exp, index) => (
        <div key={index} className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-gray-900 mt-2"></div>
            {index !== sortedExperiences.length - 1 && (
              <div className="w-0.5 h-24 bg-gray-200 my-2"></div>
            )}
          </div>

          <div className="pb-8">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  exp.type === 'Work'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {exp.type}
              </span>
            </div>
            <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
            <p className="text-sm text-gray-500 mb-3">{getDateRange(exp.startDate, exp.endDate)}</p>
            <p className="text-gray-700 leading-relaxed">{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
