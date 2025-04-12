import About from "./components/about";
import Contact from "./components/contact";
import Intro from "./components/intro";
import Projects from "./components/projects";
import Resume from "./components/resume";
import Service from "./components/service";
import Skills from "./components/skills";

export default function Home() {

  return (
    <main className="flex flex-wrap items-center justify-center ">
      <Intro />
      <About />
      <Resume />
      <Service />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
