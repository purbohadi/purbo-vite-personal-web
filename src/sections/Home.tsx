import {
  firstName,
  smallDescription,
  profileImage,
  lastName,
} from "../information";

const Home = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div
      id="home"
      className={`w-full sm:h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } flex sm:flex-row justify-center items-center my-10 sm:p-10 p-8 rounded-2xl shadow-2xl flex-col`}
    >
      <div className="flex flex-col sm:mr-40 justify-center items-center sm:mb-0 mb-10">
        <span
          className={`sm:text-5xl text-4xl ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Hello, I'm {firstName} {lastName}, you can call me{" "}
          <strong>Purbo</strong>!
        </span>
        <span
          className={`text-lg my-2 ${darkMode ? "text-white" : "text-black"}`}
        >
          {smallDescription}
        </span>
      </div>
      <img
        className="sm:w-1/4 w-1/2 rounded-full object-cover object-center shadow-md"
        src={profileImage}
        alt="nature image"
      />
    </div>
  );
};

export default Home;
