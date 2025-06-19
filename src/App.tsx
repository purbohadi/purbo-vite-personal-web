import { useState, useEffect } from "react";
import "./App.css";
import { Home, Education, Experience, Contact, Footer } from "./sections";
import { Navbar } from "./components";

export default function App() {
  const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDarkModeOn((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', next ? 'true' : 'false');
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkModeOn ? 'true' : 'false');
  }, [isDarkModeOn]);

  return (
    <div
      className={`min-h-screen ${
        isDarkModeOn ? "bg-gray-700" : "bg-gray-100"
      }`}
      role="main"
    >
      <Navbar />
      <Home darkMode={isDarkModeOn} role="region" sectionClass={isDarkModeOn ? "bg-gray-900" : ""} />
      <Education darkMode={isDarkModeOn} role="region" sectionClass={isDarkModeOn ? "bg-gray-900" : ""} />
      <Experience darkMode={isDarkModeOn} role="region" sectionClass={isDarkModeOn ? "bg-gray-900" : ""} />
      <Contact darkMode={isDarkModeOn} role="region" sectionClass={isDarkModeOn ? "bg-gray-900" : ""} />
      <Footer darkMode={isDarkModeOn} />
      <div
        className={`fixed bottom-4 right-4 flex gap-4 ${
          isDarkModeOn ? "text-white" : "text-black"
        }`}
      >
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Toggle Dark Mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="24"
            height="24"
            className={isDarkModeOn ? "hidden" : ""}
            role="img"
            aria-label="Moon"
          >
            <path
              d="M50 75c-13.807 0-25-11.193-25-25s11.193-25 25-25 25 11.193 25 25-11.193 25-25 25zm0-45c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z"
              fill="currentColor"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="24"
            height="24"
            className={isDarkModeOn ? "" : "hidden"}
            role="img"
            aria-label="Sun"
          >
            <circle cx="50" cy="50" r="20" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="4">
              <line x1="50" y1="10" x2="50" y2="0" />
              <line x1="50" y1="90" x2="50" y2="100" />
              <line x1="10" y1="50" x2="0" y2="50" />
              <line x1="90" y1="50" x2="100" y2="50" />
              <line x1="75" y1="75" x2="85" y2="85" />
              <line x1="25" y1="25" x2="15" y2="15" />
              <line x1="75" y1="25" x2="85" y2="15" />
              <line x1="25" y1="75" x2="15" y2="85" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
