import { Hair } from "./sub-comp/hair";
import Timeline from "./sub-comp/Timeline";

export default function Resume() {
    return (
        <section className="gap-5 ">
            <Hair name="Resume" />
            <h1 className="text-7xl"><b>E</b>ducation &<br /> E<b>xperiance</b></h1>
            <Timeline/>
        </section>
    )
}