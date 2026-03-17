import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";

const contacts = [
  { icon: Mail, label: "idankob@gmail.com", href: "mailto:idankob@gmail.com" },
  { icon: Mail, label: "me@idank.dev", href: "mailto:me@idank.dev" },
  { icon: Github, label: "IdanKoblik", href: "https://github.com/IdanKoblik" },
  { icon: Linkedin, label: "idan-k", href: "https://www.linkedin.com/in/idan-k/" },
  { icon: MessageCircle, label: "Discord", href: "https://discord.com/users/429212281914785793" },
];

const Contact = () => (
  <section id="contact" className="py-24">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
        <span className="text-primary">#</span> Contact
      </h2>
      <p className="text-muted-foreground mb-10 font-body">
        Get in touch.
      </p>

      <div className="terminal-block rounded-lg p-6 max-w-lg">
        <div className="space-y-3">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <c.icon size={16} className="text-primary" />
              <span className="group-hover:underline">{c.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
