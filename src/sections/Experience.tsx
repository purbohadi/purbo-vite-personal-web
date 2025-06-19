import { Timeline, SectionTitle } from "../components";

interface ExperienceProps {
    darkMode: boolean;
    role?: string;
    sectionClass?: string;
}

export default function Experience({ darkMode, role, sectionClass }: ExperienceProps) {
    return (
        <section {...(role ? { role } : {})} className={sectionClass}>
            <div
                id="experience"
                className={`w-full bg-gray-100 flex flex-col justify-start items-center my-10 sm:p-10 p-8 rounded-2xl shadow-2xl ${
                    darkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
            >
                <SectionTitle title="Experience" darkMode={darkMode} />
                <Timeline darkMode={darkMode} />
            </div>
        </section>
    );
}