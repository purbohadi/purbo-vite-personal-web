import {
  smallDescription,
  profileImage,
} from "../information";

interface HomeProps {
  darkMode: boolean;
  role?: string;
  sectionClass?: string;
}

export default function Home({ darkMode, role, sectionClass }: HomeProps) {
  return (
    <section {...(role ? { role } : {})} className={sectionClass}>
      <div
        className={`flex sm:flex-row flex-col justify-center items-center min-h-screen ${
          darkMode ? "text-gray-100" : ""
        }`}
        id="home"
      >
        <div className="flex flex-col sm:mr-40 justify-center items-center sm:mb-0 mb-10">
          <span
            className={`text-2xl sm:text-4xl font-bold mb-4 ${
              darkMode ? "text-gray-100" : ""
            }`}
          >
            Hi, I'm <strong>Purbo</strong>!
          </span>
          <span
            className={`text-lg sm:text-xl text-center ${
              darkMode ? "text-gray-100" : ""
            }`}
          >
            {smallDescription}
          </span>
        </div>
        <img
          src={profileImage}
          alt="Profile"
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover"
        />
      </div>
    </section>
  );
}
