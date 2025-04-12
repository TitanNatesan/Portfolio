"use client"
import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import GlichText from "./glich";
import "./css/sidecard.css";
import { FacebookRounded, GitHub, Instagram, LinkedIn, WhatsApp } from "@mui/icons-material";

export default function SideCard() {
    const ss = "ico w-[100%] h-[100%] transition-all scale-150 hover:scale-200 duration-500 text-black";
    const social = [
        { name: "LinkedIn", src: "/icons/linkedin.png", comp: <LinkedIn className={ss} /> },
        { name: "InstaGram", src: "/icons/instagram.png", comp: <Instagram className={ss} /> },
        { name: "GitHub", src: "/icons/github.png", comp: <GitHub className={ss} /> },
        { name: "FaceBook", src: "/icons/facebook.png", comp: <FacebookRounded className={ss} /> },
        { name: "WhatsApp", src: "/icons/whatsapp.png", comp: <WhatsApp className={ss} /> },
    ]
    return (
        <aside className="sidecard transition-all duration-800 flex flex-col justify-evenly items-center border bg-[#0001] max-w-[500px] min-w-[400px] h-[94%] shadow-lg hover:backdrop-blur hover:bg-[#fff1]">
            <header className="flex w-full justify-evenly items-center h-[10%] bg-[#0000]">
                <h4 className="w-[40%] text-center text-4xl"><GlichText /></h4>
                <h4 className="w-[40%] text-right pr-[1%] text-xl">FullStack Dev <b>&</b><br />AI Enthusiastic </h4>
            </header>
            <TiltCard />
            <div className="flex mx-[2%] justify-evenly items-center bg-[#0000]">
                {social.map((item, index) => (
                    <div key={index} className=" icon flex justify-center items-center w-[80px] h-[65px] p-[3px] m-[2%] rounded-full transition-all duration-500" >
                        <p>{item.name}</p>
                        {item.comp}
                    </div>
                ))}
            </div>
            <button className="rounded-full flex justify-center items-center ">
                <p className="text-2xl relative ">Download Resume</p>
            </button>
        </aside>
    )
}

// import { FiMousePointer } from "react-icons/fi";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export function TiltCard() {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);

        const mouseXRotation = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseYRotation = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseYRotation / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseXRotation / width - HALF_ROTATION_RANGE;

        console.log(rX, rY);

        x.set(rX);
        y.set(rY);

    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative h-96 w-72 rounded-xl "
        >

            <div
                style={{
                    transform: "translateZ(25px)",
                    transformStyle: "preserve-3d",
                    zIndex: 1,
                }}
                className="absolute grid place-content-center rounded-xl "
            >
                <img
                    style={{
                        transform: "translateZ(25px)",
                    }}
                    className="imag w-full object-cover shadow-lg rounded-xl"
                    src="/groot.webp"
                    alt="profile pic"
                />
            </div>
        </motion.div>
    );
};
