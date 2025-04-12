import "./css/style.css"

export default function SkillCards({ skills }) {
    return (
        <div className="flex flex-wrap justify-evenly items-center mb-10">
            {skills.map((skill, index) => (
                <div key={index} className=" skilcard flex flex-col items-center justify-center rounded-full shadow-xl hover:shadow-2xl border-transparent">
                    <img className="p-[10%]" src={skill.img} alt={skill.name} />
                    <h4 className="text-2xl font-bold text-center">{skill.name}</h4>
                </div>
            ))}
        </div>
    )
}