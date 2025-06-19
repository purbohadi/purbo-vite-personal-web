import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import { ComputerDesktopIcon, ClockIcon } from "@heroicons/react/24/solid";
import useInView from "../hooks/useInView";
import { experiences } from "../information";
import { Experience } from "../types";

export default function TimelineWithIcon({ darkMode }: { darkMode: boolean }) {
  const refs = experiences.map(() => useInView({ threshold: 0.9 }));
  const icons = [
    <ClockIcon key="clock" className={`h-4 w-4 ${darkMode ? "" : ""}`} />,
    <ComputerDesktopIcon key="desktop1" className={`h-4 w-4 ${darkMode ? "" : ""}`} />,
    <ComputerDesktopIcon key="desktop2" className={`h-4 w-4 ${darkMode ? "" : ""}`} />,
    <ComputerDesktopIcon key="desktop3" className={`h-4 w-4 ${darkMode ? "" : ""}`} />,
    <ComputerDesktopIcon key="desktop4" className={`h-4 w-4 ${darkMode ? "" : ""}`} />,
    <ComputerDesktopIcon key="desktop5" className={`h-4 w-4 ${darkMode ? "" : ""}`} />,
    <ComputerDesktopIcon key="desktop6" className={`h-4 w-4 ${darkMode ? "" : ""}`} />,
  ];

  return (
    <div className="sm:w-[32rem] w-7/8">
      <Timeline>
        {experiences.map((experience: Experience, index: number) => {
          const [ref, isInView] = refs[index];
          const isNextInView = index < refs.length - 1 && refs[index + 1][1];
          return (
            <TimelineItem
              key={index}
              ref={ref}
              className={`transition-opacity duration-1000 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
            >
              {index < experiences.length - 1 && isNextInView && (
                <TimelineConnector data-testid="timeline-connector" />
              )}
              <TimelineHeader>
                <TimelineIcon
                  className={`p-2 ${darkMode ? "bg-gray-700" : ""}`}
                  data-testid="timeline-icon"
                >
                  {icons[index]}
                </TimelineIcon>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className={darkMode ? "text-gray-100" : ""}
                >
                  {experience.role}
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className={`text-left ${darkMode ? "text-gray-100" : ""}`}
                >
                  {experience.company}
                </Typography>
                <Typography
                  color="blue-gray"
                  className={`text-left mb-3 ${
                    darkMode ? "text-gray-100" : ""
                  }`}
                >
                  {experience.duration}
                </Typography>
                <Typography
                  color="gray"
                  className={`font-normal text-gray-600 text-justify ${
                    darkMode ? "text-white" : ""
                  }`}
                  data-testid={`timeline-description-${index}`}
                >
                  {experience.description}
                </Typography>
              </TimelineBody>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
}
