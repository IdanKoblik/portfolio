import { Server, Container, Terminal, Database, Code2, GitBranch } from "lucide-react";

const skills = [
  { icon: Server, label: "Backend Systems" },
  { icon: Container, label: "Docker" },
  { icon: Terminal, label: "Linux" },
  { icon: Database, label: "PostgreSQL, Sqlite, MongoDB" },
  { icon: Code2, label: "Java · Kotlin · Go · C/C++ · Python" },
  { icon: GitBranch, label: "CI/CD & DevOps" },
];

const About = () => (
  <section id="about-me" className="py-24">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
        <span className="text-primary">#</span> About Me
      </h2>
      <p className="text-muted-foreground mb-10 font-body">
        Who I am and what I do.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Bio */}
        <div className="lg:col-span-3 space-y-4 text-base leading-relaxed text-muted-foreground font-body">
          <p>
            I'm a <span className="text-foreground font-medium">backend & systems developer</span> focused on building
            reliable, performant infrastructure. I work primarily with{" "}
            <span className="text-primary">Go</span>,{" "}
            <span className="text-primary">C/C++</span>,{" "}
            <span className="text-primary">Java/Kotlin</span>, and{" "}
            <span className="text-primary">Python</span>, and{" "}
            microservices, and low-level utilities that power backend workflows.
          </p>
          <p>
            I'm passionate about Linux environments, containerization with Docker,
            and designing systems that are easy to deploy and maintain. Most of my
            projects live on GitHub and are open source.
          </p>
        </div>

        {/* Skills grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          {skills.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-lg p-4 flex flex-col items-center gap-2 text-center glow-card"
            >
              <s.icon size={20} className="text-primary" />
              <span className="text-xs text-muted-foreground font-display leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
