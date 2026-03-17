import { useState } from "react";
import { Copy, Check, Github, Linkedin, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("idankob@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="min-h-screen flex items-center pt-14">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="terminal-block rounded-lg px-4 py-2 inline-block mb-6 text-sm text-muted-foreground">
            <span className="text-primary">$</span> whoami
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Idan Koblik
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl font-body leading-relaxed">
            Backend & systems developer. Building tools with Go, C/C++, Zig, and more. 
            Passionate about low-level systems, CLI tools, and infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Button variant="glow" onClick={copyEmail} className="font-display text-sm">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy Email"}
            </Button>

            <a href="https://github.com/IdanKoblik" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="font-display text-sm">
                <Github size={16} />
                GitHub
              </Button>
            </a>

            <a href="https://www.linkedin.com/in/idan-k/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="font-display text-sm">
                <Linkedin size={16} />
                LinkedIn
              </Button>
            </a>
          </div>

          <div className="terminal-block rounded-lg p-4 text-sm max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={14} className="text-primary" />
              <span className="text-muted-foreground">contact.sh</span>
            </div>
            <div className="space-y-1 text-muted-foreground">
              <p><span className="text-primary">email</span>    = "idankob@gmail.com"</p>
              <p><span className="text-primary">alt</span>      = "me@idank.dev"</p>
              <p><span className="text-primary">discord</span>  = <a href="https://discord.com/users/429212281914785793" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">"IdanK"</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
