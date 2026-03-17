import { Star, GitFork, ExternalLink } from "lucide-react";

interface Project {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
}

const projects: Project[] = [
  { name: "whisper", description: "SMS gateway", url: "https://github.com/IdanKoblik/whisper", language: "Go", stars: 5, forks: 0 },
  { name: "artifactor", description: "Package version manager service", url: "https://github.com/IdanKoblik/artifactor", language: "Go", stars: 0, forks: 0 },
  { name: "oedipus", description: "Linux CLI text editor", url: "https://github.com/IdanKoblik/oedipus", language: "C++", stars: 0, forks: 0 },
  { name: "paperclip", description: "Wayland clipboard", url: "https://github.com/IdanKoblik/paperclip", language: "C", stars: 0, forks: 0 },
  { name: "aoc-2025", description: "Advent of Code 2025", url: "https://github.com/IdanKoblik/aoc-2025", language: "Zig", stars: 1, forks: 0 },
  { name: "headscale", description: "Self-hosted Tailscale control server (fork)", url: "https://github.com/IdanKoblik/headscale", language: "Go", stars: 0, forks: 0 },
];

const langColors: Record<string, string> = {
  Go: "bg-primary",
  "C++": "bg-pink-500",
  C: "bg-gray-400",
  Zig: "bg-amber-500",
};

const ProjectCard = ({ project }: { project: Project }) => (
  <a
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-card border border-border rounded-lg p-5 glow-card group"
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
        {project.name}
      </h3>
      <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>

    <p className="text-sm text-muted-foreground mb-4 font-body">
      {project.description}
    </p>

    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span className={`w-2.5 h-2.5 rounded-full ${langColors[project.language] || "bg-muted-foreground"}`} />
        {project.language}
      </span>
      {project.stars > 0 && (
        <span className="flex items-center gap-1">
          <Star size={12} />
          {project.stars}
        </span>
      )}
      {project.forks > 0 && (
        <span className="flex items-center gap-1">
          <GitFork size={12} />
          {project.forks}
        </span>
      )}
    </div>
  </a>
);

const Projects = () => (
  <section id="projects" className="py-24">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
        <span className="text-primary">#</span> Projects
      </h2>
      <p className="text-muted-foreground mb-10 font-body">
        Open source work and personal projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
