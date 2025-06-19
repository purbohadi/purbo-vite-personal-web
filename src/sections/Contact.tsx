import { Form, SectionTitle } from "../components";

interface ContactProps {
    darkMode: boolean;
    role?: string;
    sectionClass?: string;
}

export default function Contact({ darkMode, role, sectionClass }: ContactProps) {
    return (
        <section {...(role ? { role } : {})} className={sectionClass}>
            <div
                id="contact"
                className={`w-full bg-gray-100 flex flex-col justify-start items-center sm:p-10 p-8 rounded-2xl shadow-2xl ${
                    darkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
            >
                <SectionTitle title="Contact" darkMode={darkMode} />
                <Form darkMode={darkMode} />
            </div>
        </section>
    );
}
