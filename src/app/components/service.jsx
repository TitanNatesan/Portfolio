import { Hair } from "./sub-comp/hair";
import ServiceCard from "./sub-comp/serviceCard";
import { InsertChart, PhoneIphone, SmartToy, WifiLockOutlined } from "@mui/icons-material";
import { BarChartIcon, CodeIcon } from "lucide-react";

export default function Service() {
    const services = [
        {
            name: "Backend Development",
            descp: "I'm a Specialized backend developer using django and django-restframework for backend development and Authentication.",
            icon: <WifiLockOutlined style={{ color: "var(--foreground)" }} className="scale-[2]" />,
        },
        {
            name: "Frontend Development",
            descp: "I'm a Specialized frontend developer using React.js and Next.js for frontend development.",
            icon: <CodeIcon style={{ color: "var(--foreground)" }} className="scale-[2]" />,
        },
        {
            name: "Data Science",
            descp: "I'm a Specialized data scientist using python and R for data science and machine learning.",
            icon: <InsertChart style={{ color: "var(--foreground)" }} className="scale-[2]" />,
        },
        {
            name: "Mobile App Development",
            descp: "I'm a Specialized mobile app developer using flutter and react-native for mobile app development.",
            icon: <PhoneIphone style={{ color: "var(--foreground)" }} className="scale-[2]" />,
        },
        {
            name: "Data Analytics",
            descp: "I'm a Specialized data analyst using python and R for data analytics.",
            icon: <BarChartIcon style={{ color: "var(--foreground)" }} className="scale-[2]" />,
        },
        {
            name: "Machine Learning",
            descp: "I'm a Specialized machine learning engineer using python and R for machine learning.",
            icon: <SmartToy style={{ color: "var(--foreground)" }} className="scale-[2]" />,
        },

    ]
    return (
        <section>
            <Hair name={"Service"} />
            <h1 className="text-7xl"><b>My</b> Specializations</h1>
            <ServiceCard services={services} />
        </section>
    )
}