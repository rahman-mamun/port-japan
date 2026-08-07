import { About } from './components/About';
import { Contact } from './components/Contact';
import { Contents } from './components/Contents';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Testimonials } from './components/Testimonials';

export default function App() {
  return (
    <div className="noise min-h-svh bg-ink">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Contents />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
