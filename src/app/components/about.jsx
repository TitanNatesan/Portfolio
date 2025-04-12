"use client";

import { Hair } from "./sub-comp/hair";
import { useRouter } from "next/navigation";

export default function About() {
    const router = useRouter();

    return (
        <section className="gap-5">
            <Hair name="About" />
            <h1 className="text-7xl">Natesan <b>is...</b></h1>
            <p style={{ color: `var(--foreground)` }} className="text-xl text-justify indent-5">
                A driven and <b>innovative individual</b> with a profound passion for computer <b>science and entrepreneurship</b>.
                He has built a strong foundation in <b>coding</b>, <b>mathematics</b>, and <b>problem solving</b>, which empowers him to transform creative ideas into tangible technological solutions.
                His <b>academic</b> journey is not only marked by <b>rigorous study</b> but also by a <b>relentless curiosity</b> and an <b>eagerness to learn</b> from <b>every project</b> he undertakes.
            </p>
            <p style={{ color: `var(--foreground)` }} className="text-xl text-justify indent-5">
                Those who know him describe Natesan as a <b>visionary person</b> who consistently seeks out <b>new challenges</b> and <b>opportunities</b> to make a <b>real impact</b> in the tech world.
                His <b>proactive approach</b> to <b>learning</b> and his ability to adapt to <b>emerging trends</b> make him a <b>standout candidate</b> for any forward-thinking team.
                Whether he's <b>brainstorming</b> the next big startup idea or diving deep into <b>innovative coding projects</b>, Natesan's <b>commitment to excellence</b> and his <b>passion for technology</b> are <b>evident</b> in every endeavor <b>he pursues</b>.
            </p>
            <button style={{ backgroundColor: `var(--primary)` }} className="cursor-pointer rounded-full text-xl flex justify-center items-center w-[22%] p-3">
                <p style={{ color: `var(--primary)` }} disp="Explore Projects !" className="txtani ">Explore Projects !</p>
            </button>
        </section>
    );
}
