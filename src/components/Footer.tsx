const Footer = () => (
  <footer className="border-t border-border py-6">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p className="text-xs text-muted-foreground font-display">
        © {new Date().getFullYear()} Idan Koblik. All rights reserved.
      </p>
      <p className="text-xs text-muted-foreground font-body">
        Built with React & TailwindCSS
      </p>
    </div>
  </footer>
);

export default Footer;
