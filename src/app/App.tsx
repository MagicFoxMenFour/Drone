import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Cases } from "./components/Cases";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Testimonials } from "./components/Testimonials";
import { CursorTrail } from "./components/CursorTrail";
import { FadeSection } from "./components/FadeSection";

function App() {
  return (
    <main className="antialiased selection:bg-blue-600 selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <CursorTrail />
      <Header />
      <Hero />
      <FadeSection delay={0}>
        <Services />
      </FadeSection>
      <FadeSection delay={0}>
        <About />
      </FadeSection>
      <FadeSection delay={0}>
        <Cases />
      </FadeSection>
      <FadeSection delay={0}>
        <Testimonials />
      </FadeSection>
      <FadeSection delay={0}>
        <Pricing />
      </FadeSection>
      <FadeSection delay={0}>
        <FAQ />
      </FadeSection>
      <FadeSection delay={0}>
        <Contact />
      </FadeSection>
    </main>
  );
}

export default App;
