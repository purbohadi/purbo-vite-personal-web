import myProfilePicture from "./assets/myProfilePicture.jpg";
import ELTE from "./assets/universities/ELTE.png";
import UB from "./assets/universities/UB.png";
import questionMark from "./assets/emojis/questionMark.png";
import ID from "./assets/emojis/id.svg";
import HU from "./assets/emojis/hu.svg";
import { University, Experience } from "./types";

// Informations to be used in the Navbar and Home section
export const firstName: string = "Purbohadi";
export const lastName: string = "Utomo";
export const smallDescription: string = "A Husband, A Father and A Developer."; // A small description of yourself for the first section
export const profileImage: string = myProfilePicture;

// Information to be used in the Education section
export const universities: University[] = [
  {
    logo: UB,
    name: "Brawijaya University",
    degreeType: "Bachelor's degree",
    degree: "Informatics and Computer Engineering",
    description:
      "Final Project: Mobile Email AES-Rijndael Algorithm Implementation",
    duration: "2002 - 2008",
    url: "https://www.brawijaya.ac.id/en/",
    countryFlag: ID,
  },
  {
    logo: ELTE,
    name: "Eötvös Loránd University",
    degreeType: "Master of Science",
    degree: "Computational and Cognitive Neuroscience",
    description:
      "2 years of learning while travelling in the field of Cognitive Neuroscience, with a focus on the neural basis of human language.",
    duration: "2017 - 2019",
    url: "https://www.elte.hu/en/",
    countryFlag: HU,
  },
  {
    logo: questionMark,
    name: "Unknown",
    degreeType: "PhD",
    degree: "AI and Cybersecurity",
    description:
      "It's still an unknown, but maybe on the future, if it arises a PhD degree, it would be Artificial Intelligence or Cybersecurity related. The university that I will choose, will be somewhere in Japan or Europe. Until then I want to gain more work experience in tech industries.",
    duration: "",
    url: "",
    countryFlag: questionMark,
  },
];

// Information to be used in the Education section
export const experiences: Experience[] = [
  {
    role: "Senior Web Developer",
    company: "S-Quantum Engine (Sinarmas)",
    duration: "Jan 2024 - Present",
    description:
      "SQE is Making impact to millions of lives Dig into the ways we've transformed financial services, and the discoveries we've made on our path to success. ",
  },
  {
    role: "Lead Mobile Developer",
    company: "Kepercayaan Informasi Terintegrasi (Sinarmas)",
    duration: "Jul 2022 - Dec 2023",
    description:
      "Developing the website for company website to showcase company's products. Constantly collaborating with the product and design teams, to keep improving the product. Using technologies like React.js, TypeScript, Vue.js. Integrating our products with 3rd party APIs and other Sinarmas Businesses Unit",
  },
  {
    role: "Product Owner",
    company: "Aino Indonesia",
    duration: "Feb 2020 - Apr 2021",
    description:
      "Tech Lead and team development plan. Delivering end to end products that generate 1000-1500 daily transactions. Problem-solving and operational improvement. Design end to end and full-cycle system. Conduct requirement gathering and propose a win-win full product solution for clients and developers. Create an improved standard for development of best practice and operational excellence.",
  },
  {
    role: "System Analyst",
    company: "Aino Indonesia",
    duration: "Oct 2019 - Jan 2020",
    description:
      "Analyze the Legacy system and propose a solution to make it better. Create a technical document to fix or improve running software. Code to fix and improve the running system. Deliver end to end solutions to optimize operational costs.",
  },
  {
    role: "Lead Engineer",
    company: "Samsung R&D Institute Indonesia",
    duration: "Jun 2012 - Aug 2017",
    description:
      "Software Quality Engineer created test automation script using Java for Android apps and Web apps. Generated a test plan to be executed during test period or ad hoc test. Taught for automation class to explain how things work in automation testing world. Android App Engineer Maintained production lives app on Samsung Global and Local Apps. Find Bugs and fix it in a proper way. Developed new feature while maintaining code style and readability. Created unit testing for the apps. Knowledge sharing for App and new ideas. Conducted daily standup and collaborate with the project manager and quality engineer. Blackberry Developer Maintained and bug fixing for Chat application for Samsung. Developed new feature and test the code. Created documentation for the code. Collaborated with the engineer, UI/UX, quality engineer and project manager from Headquarter.",
  },
  {
    role: "Jatis Mobile",
    company: "Unit Head",
    duration: "Feb 2009 - Mar 2011",
    description:
      "Conducted research activities in the mobile solution, collaborative commerce, and mobile payment. Developed and implemented Proof of Concept (POC). Gaved advice and designed system for the mobile solution. Provide consultation on mobile solution in collaborative commerce.",
  },
];

// Information to be used in the footer
export const sourceCodeLink: string =
  "https://github.com/purbohadi/vite-react-personal-web";
export const linkedinLink: string =
  "https://www.linkedin.com/in/purbohadiutomo/";
export const githubLink: string = "https://github.com/purbohadi";
