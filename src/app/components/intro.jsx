"use client";

import { TypeAnimation } from "react-type-animation";
import { Hair } from "./sub-comp/hair";

export default function Intro() {
    return (
        <section className="gap-5">
            <Hair name="1st Of All" />
            <h1 className="text-7xl">I'm <b>Titan</b></h1>
            <TypeAnimation
                sequence={[
                    "I'm also Full Stack Developer",
                    1000,
                    "I'm also AI Enthusiastic",
                    1000,
                    "I'm also Specialized in Backend",
                    1000,
                    "I'm also Python Dev",
                    1000,
                ]}
                speed={50}
                repeat={Infinity}
                className="text-2xl"
            />
            <p style={{ color: `var(--foreground)` }} className="text-xl text-justify indent-5">
                Hi, I’m <b>Titan</b> Natesan. 
                I’m a passionate <b>computer science enthusiast </b>
                with a creative spark and an <b>entrepreneurial</b> mindset. 
                I believe that <b>coding</b>, <b>innovation</b>, 
                and a <b>love</b> for problem solving 
                can transform <b>ideas into reality</b>. 
                In this portfolio, you’ll find a showcase of <b>my projects</b>, 
                the skills I’ve honed through <b>hands-on</b> learning, 
                and my journey toward building a groundbreaking startup. 
                I’m excited to <b>share my work</b> and vision with 
                you—<b>welcome</b> to my creative space where 
                <b> technology meets innovation.</b>
            </p>
            <button style={{ backgroundColor: `var(--primary)` }} className="cursor-pointer rounded-full text-xl flex justify-center items-center w-[22%] p-3">
                <p style={{ color: `var(--primary)` }} disp="Get In Touch !" className="txtani ">Get In Touch !</p>
            </button>
        </section>
    )
}