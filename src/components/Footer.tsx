const Footer = () => (
  <footer className="border-t border-border py-6">
    <div className="container mx-auto px-4 flex items-center justify-center">
      <p className="text-xs text-muted-foreground font-display">
        © {new Date().getFullYear()} Idan Koblik. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
