import { Hair } from "./sub-comp/hair";
import ProjectCard from "./sub-comp/projectCard";

export default function Projects() {
    const data = [
        {
            name: "Renz-Trending",
            github: "https://github.com/TitanNatesan/Aslam-Garments",
            live: "https://renz-trending.titandev.me/",
            techStack: ["Django - DRF", "PostgreSQL", "Next JS", "Tailwind", "Razorpay", "ShipRocket", "AWS"],
            background: "/projects/renz.png",
            css: "col-span-8 row-span-10 col-start-1 row-start-1"
        },
        {
            name: "ICIBHA",
            github: "https://github.com/TitanNatesan/ICIBHA2025",
            live: "https://icibha.vercel.app/",
            techStack: ["Next JS", "Tailwind"],
            background: "/projects/icibha.png",
            css: "col-span-2 row-span-12 col-start-9 row-start-1"
        },
        {
            name: "Hand Gesture Recognition",
            github: "https://github.com/TitanNatesan/Hand-Gesture-Detection",
            live: null,
            techStack: ["Keras", "PyTorch", "OpenCV"],
            background: "/projects/handges.png",
            css: "col-span-7 row-span-7 col-start-1 row-start-11"
        },
        {
            name: "BLIP Image Captioning",
            github: "https://github.com/TitanNatesan/BLIP-ImageCaptioning",
            live: null,
            techStack: ["Transformers", "PyTorch"],
            background: "/projects/blip.png",
            css: "col-span-6 row-span-6 col-start-5 row-start-29"
        },
        {
            name: "Bone Fracture Detection",
            github: null,
            live: null,
            techStack: ["PyTorch", "Streamlit", "FastAPI", "Next JS"],
            background: "/projects/bonefrac.png",
            css: "col-span-6 row-span-6 col-start-1 row-start-23"
        },
        {
            name: "Herbal Plant Classification",
            github: "https://github.com/TitanNatesan/HerbalPlantClassification",
            live: "https://herbalplantclassification.streamlit.app/",
            techStack: ["Tensorflow", "PyTorch", "Streamlit", "Kaggle"],
            background: "/projects/herbal.png",
            css: "col-span-3 row-span-10 col-start-8 row-start-13"
        },
        {
            name: "Plant Disease Detection",
            github: "https://github.com/TitanNatesan/TeaLeaf-YOLOv11",
            live: null,
            techStack: ["Tensorflow", "PyTorch", "FastAPI", "HTML/CSS/JS"],
            background: "/projects/pest.png",
            css: "col-span-5 row-span-5 col-start-1 row-start-18"
        },

        {
            name: "Image Dehazing",
            github: "https://github.com/TitanNatesan/ImageDehazing",
            live: null,
            techStack: ["Django", "PIP Dehaze", "OpenCV"],
            background: "/projects/dehaze.png",
            css: "col-span-4 row-span-4 col-start-7 row-start-23"
        },
        {
            name: "filler",
            css: "col-span-1 row-span-2",
        },
        {
            name: "filler",
            css: "col-span-2 row-span-5",
        },
        {
            name: "filler",
            css: "col-span-4 row-span-2",
        },
        {
            name: "filler",
        },
        {
            name: "filler",
            css: "col-span-3 row-span-6"
        },
        {
            name: "filler",
            css: "col-span-1 row-span-5"
        },
    ]
    return (
        <section>
            <Hair name={"Projects"} />
            <h1 className="text-7xl"><b>Projects</b></h1>
            <div className="grid procon grid-cols-10 gap-4 rounded-2xl overflow-hidden mt-10">
                {data.map((project, index) => (
                    <ProjectCard
                        key={index}
                        css={project.css}
                        techStack={project.techStack}
                        name={project.name}
                        github={project.github}
                        live={project.live}
                        background={project.background}
                    />
                ))}
            </div>
        </section>
    )
}