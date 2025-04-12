import "./css/sidecard.css"

export default function Timeline() {
    const data = [
        {
            date: {
                start: "2020",
                end: "2022"
            },
            data: [
                {
                    title: "High School",
                    subtitle: "Universal Matriculation Higher Secondary School",
                    description: null,
                }
            ],
        },
        {
            date: {
                start: "Sep'2022",
                end: "Present"
            },
            data: [
                {
                    title: "BE in Computer Science and Engineering",
                    subtitle: "Karpagam Academy of Higher Education",
                    description: null,
                },
                {
                    title: "Freelancing",
                    subtitle: null,
                    description: "Worked on multiple projects including web and mobile app development, Data Analtics and Machine Learning.",
                }
            ],
        },

    ];

    return (
        <article className="flex flex-col relative">{
            data.map((item, index) => (
                <div key={index} className="relative">
                    <div className={` timeline-item ${index % 2 === 0 ? "rit " : "lft "}`}>
                        <time className="">{item.date.start} - {item.date.end}</time>
                        {item.data.map((subItem, subIndex) => (
                            <div key={subIndex} className="mt-5 con">
                                <h4 className="text-2xl">{subItem.title}</h4>
                                <h5 className="">{subItem.subtitle || ""}</h5>
                                <p className="">{subItem.description || ""}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </article>
    )
}