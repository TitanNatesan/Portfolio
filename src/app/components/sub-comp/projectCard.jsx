"use client"
import { ArrowOutward, GitHub } from "@mui/icons-material";
import "./css/projectcard.css";

export default function ProjectCard({ css, techStack, name, github, live, background }) {

    return (
        name !== "filler" ? (
            <div className={`procard relative overflow-hidden flex flex-col items-center rounded hover:rounded-3xl hover:shadow-2xl  ${css ?? ""}`}>
                <img className="absolute my-auto" src={background ?? "/projects/icibha.png"} alt="background" />
                <div className="blay" >
                    {live && <a href={live}><ArrowOutward className=" gh absolute text-black right-12" /></a>}
                    {github && <a href={github}><GitHub className=" gh absolute text-black right-4" /></a>}
                </div>
                <h1 className="absolute left-5 text-left text-2xl">{name}</h1>
                <div className="ts flex flex-wrap absolute w-[96%] gap-1 mb-2">
                    {techStack.map((tech, index) => (
                        <p key={index} className={`px-4 py-2 rounded-full text-center`}>{tech}</p>
                    ))}
                </div>
            </div>
        ) : (
            <div className={`procard filr relative overflow-hidden flex flex-col items-center rounded hover:rounded-xl  ${css ?? "col-span-1 row-span-1"}`}></div>
        )

    )
}