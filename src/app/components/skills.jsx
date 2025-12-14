import { Hair } from "./sub-comp/hair"
import SkillCards from "./sub-comp/skillCard"

export default function Skills() {
    const fs = [
        { name: "Next JS", img: "/skills/next.png" },
        { name: "React JS", img: "/skills/react.png" },
        { name: "Tailwind", img: "/skills/tcss.png" },
        { name: "Django / DRF", img: "/skills/dj.png" },
        { name: "FastAPI", img: "/skills/FastAPI.png" },
        { name: "Flask", img: "/skills/Flask.png" },
        { name: "PostgreSQL", img: "/skills/postgresql.png" },
        { name: "MySQL", img: "/skills/mysql.png" },
        { name: "MongoDB", img: "/skills/mongodb.png" },
        { name: "SQLite", img: "/skills/SQLite.png" },
    ]
    const dt = [
        { name: "VS Code", img: "/skills/vscode.png" },
        { name: "JupyterLab", img: "/skills/jupyterlab.png" },
        { name: "Git", img: "/skills/git.png" },
        { name: "GitHub", img: "/skills/githubb.png" },
    ]
    const lnf = [
        { name: "Tensorflow", img: "/skills/TF.png" },
        { name: "Pytorch", img: "/skills/PyTorch.png" },
        { name: "OpenCV", img: "/skills/OpenCV.png" },
        { name: "Keras", img: "/skills/Keras.png" },
        { name: "Numpy", img: "/skills/numpy.png" },
        { name: "Pandas", img: "/skills/pandas.png" },
        { name: "Arch", img: "/skills/arch-linux.png" },
        { name: "Vercel", img: "/skills/vercel.png" },
        { name: "Digital Ocean", img: "/skills/do.png" },
        { name: "NGINX", img: "/skills/NGINX.png" },
        { name: "Postman", img: "/skills/Postman.png" },
        { name: "Vite JS", img: "/skills/Vite.js.png" },
    ]
    return (
        <section>
            <Hair name={"Skills"} />
            <h1 className="text-7xl"><b>Full</b> Stack</h1>
            <SkillCards skills={fs} />
            <h1 className="text-7xl"><b>Dev</b> Tools</h1>
            <SkillCards skills={dt} />
            <h1 className="text-7xl"><b>And</b> Else</h1>
            <SkillCards skills={lnf} />
        </section>
    )
}