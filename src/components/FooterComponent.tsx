import { Typography } from "@material-tailwind/react";
import {
  firstName,
  lastName,
  sourceCodeLink,
  linkedinLink,
  githubLink,
} from "../information";

const currentYear = new Date().getFullYear();

export default function FooterWithSocialLinks({
  darkMode,
}: {
  darkMode: boolean;
}) {
  return (
    <footer className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className={`mb-4 text-center font-normal ${
              darkMode ? "text-blue-gray-100" : ""
            } md:mb-0`}
          >
            &copy; {currentYear} {firstName} {lastName} . All Rights Reserved.{" "}
            <a href={sourceCodeLink} target="_blank" rel="noopener noreferrer">
              <span className="cursor-pointer">Source code.</span>
            </a>
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <svg
                className="h-5 w-5"
                fill={darkMode ? "white" : "currentColor"}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11.5 20h-3v-11h3v11zm-1.5-12.3c-1 0-1.8-.8-1.8-1.7 0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 .9-.8 1.7-1.8 1.7zm13.3 12.3h-3v-5.5c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.9 1.4-.1.2-.1.5-.1.8v5.5h-3v-11h3v1.5c.4-.7 1.2-1.7 2.9-1.7 2.1 0 3.6 1.3 3.6 4.1v7.1z" />
              </svg>
            </Typography>
            <Typography
              as="a"
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <svg
                className="h-5 w-5"
                fill={darkMode ? "white" : "currentColor"}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}
