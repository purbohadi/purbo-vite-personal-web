import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { firstName, lastName } from "../information";

const handleSmoothScroll = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href")!.slice(1);
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
};

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#home"
          className="flex items-center hover:text-blue-500 transition-colors"
          onClick={handleSmoothScroll}
        >
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#education"
          className="flex items-center hover:text-blue-500 transition-colors"
          onClick={handleSmoothScroll}
        >
          Education
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#experience"
          className="flex items-center hover:text-blue-500 transition-colors"
          onClick={handleSmoothScroll}
        >
          Experience
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#contact"
          className="flex items-center hover:text-blue-500 transition-colors"
          onClick={handleSmoothScroll}
        >
          Contact
        </a>
      </Typography>
    </ul>
  );
}

export default function NavbarSimple() {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <nav role="banner">
      <Navbar className="max-w-screen-2xl px-6 py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#home"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
            onClick={handleSmoothScroll}
          >
            {firstName} {lastName}
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
            aria-label={openNav ? "Close Navigation" : "Open Navigation"}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </nav>
  );
}
