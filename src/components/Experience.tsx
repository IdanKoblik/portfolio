import { Briefcase, Code2 } from "lucide-react";

interface ExperienceItem {
  icon: typeof Briefcase;
  title: string;
  role: string;
  period: string;
  bullets: string[];
}

const experiences: ExperienceItem[] = [
  {
    icon: Briefcase,
    title: "Gaming & Web Industry Development",
    role: "Backend Developer",
    period: "2023 — Present",
    bullets: [
      "Collaborating with multiple development teams in the gaming industry, contributing to backend systems and architecture",
      "Containerizing applications and services using Docker for consistent development and deployment environments",
      "Implementing and maintaining Linux-based development environments for various gaming projects",
      "Designing and optimizing backend systems using Java, Kotlin, and Python for improved performance and scalability",
      "Managing and optimizing MongoDB and PostgreSQL databases for efficient data storage and retrieval",
      "Participating in code reviews, testing and technical discussions with international development teams",
    ],
  },
  {
    icon: Code2,
    title: "Self-Maintained Projects",
    role: "Independent Backend Developer",
    period: "2023 — Present",
    bullets: [
      "Developing and maintaining personal backend projects using Java, Kotlin, and Python",
      "Implementing DevOps CI/CD pipelines and automated deployment systems",
      "Creating custom Linux server configurations and maintenance scripts",
      "Building scalable backend architectures for web applications",
      "Managing version control and collaborative development using Git",
      "Implementing Docker containerization for microservices and maintaining Docker registries",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="py-24">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
        <span className="text-primary">#</span> Experience
      </h2>
      <p className="text-muted-foreground mb-10 font-body">
        Professional timeline.
      </p>

      <div className="relative space-y-8 max-w-3xl">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />

        {experiences.map((exp) => (
          <div key={exp.title} className="relative pl-12">
            {/* Dot */}
            <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(199_89%_60%/0.5)]" />

            <div className="bg-card border border-border rounded-lg p-5 glow-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <div className="flex items-center gap-2">
                  <exp.icon size={16} className="text-primary" />
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    {exp.title}
                  </h3>
                </div>
                <span className="text-xs font-display text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              <p className="text-xs text-primary font-display mb-3">{exp.role}</p>

              <ul className="space-y-1.5">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-muted-foreground font-body flex gap-2">
                    <span className="text-primary mt-1 shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
