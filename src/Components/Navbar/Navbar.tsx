import { useEffect, useState } from "react";

const Navbar = () => {
  // const [theme, setTheme] = useState("light");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  // const toggleTheme = () => {
  //   const body = document.body;
  //   const currentTheme = body.getAttribute("data-theme");

  //   if (currentTheme === "dark") {
  //     setTheme("light");
  //     body.setAttribute("data-theme", "light");
  //     localStorage.setItem("theme", "light");
  //   } else {
  //     setTheme("dark");
  //     body.setAttribute("data-theme", "dark");
  //     localStorage.setItem("theme", "dark");
  //   }
  // };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="fixed top-4 right-1/2 rounded-xl outline-1 shadow-lg translate-x-1/2 sm:container w-[calc(100vw-2rem)] py-4 px-8 h-16 bg-[var(--foreground-color)] grid grid-cols-2 md:grid-cols-3 items-center z-50">
        <span className="text-[var(--text-color)] font-bold text-lg  ">
          AbhijithGaganan.
        </span>
        <span className="justify-center hidden md:!flex">
          <ul className="flex gap-4 text-[var(--text-color)]">
            <li className="cursor-pointer hover:opacity-100 opacity-80">
              <a href="#home">Home</a>
            </li>
            <li className="cursor-pointer hover:opacity-100 opacity-80">
              <a href="#about">About</a>
            </li>
            <li className="cursor-pointer hover:opacity-100 opacity-80">
              <a href="">Projects</a>
            </li>
            <li className="cursor-pointer hover:opacity-100 opacity-80">
              <a href="">Connect</a>
            </li>
            <li className="cursor-pointer hover:opacity-100 opacity-80">
              <a href="">Contact</a>
            </li>
          </ul>
        </span>
        <span className="text-[var(--text-color)] cursor-pointer justify-end flex gap-4">
          <i
            className="fa-bars fa-solid fa-xl md:!hidden"
            onClick={toggleNavbar}
          ></i>
          {/* <i
            onClick={toggleTheme}
            className={`fa-lightbulb fa-xl  ${
              theme === "dark" ? "fa-regular " : "fa-solid"
            }`}
          ></i> */}
        </span>
      </div>
      <div
        className={`fixed left-0 top-0 bg-[var(--secondary-color)] w-full h-full flex items-center transition-all duration-300 ease-in-out z-40 ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="container mx-auto p-8">
          <ul className="text-[var(--text-color)] text-5xl flex flex-col gap-4">
            <li
              onClick={toggleNavbar}
              className="cursor-pointer hover:opacity-100 opacity-80 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <a href="">Home</a>
            </li>
            <li
              onClick={toggleNavbar}
              className="cursor-pointer hover:opacity-100 opacity-80 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <a href="">About</a>
            </li>
            <li
              onClick={toggleNavbar}
              className="cursor-pointer hover:opacity-100 opacity-80 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <a href="">Projects</a>
            </li>
            <li
              onClick={toggleNavbar}
              className="cursor-pointer hover:opacity-100 opacity-80 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <a href="">Connect</a>
            </li>
            <li
              onClick={toggleNavbar}
              className="cursor-pointer hover:opacity-100 opacity-80 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
