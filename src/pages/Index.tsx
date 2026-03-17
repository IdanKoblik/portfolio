import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Articles from "@/components/Articles";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Articles />
    <Contact />
    <Footer />
  </div>
);

export default Index;
