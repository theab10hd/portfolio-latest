import React from "react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";

const Home = () => {
  return (
    <div className="bg-[var(--background-dark)] ">
      <section
        className="h-[45rem] md:h-screen relative overflow-hidden"
        id="home"
      >
        <video
          src="/videos/grid-loop.mp4"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          className="w-full h-full object-cover opacity-30 pointer-events-none "
        ></video>
        <div className="absolute container  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-200 z-10 p-8 ">
          <p className="text-2xl md:text-4xl text-gray-400 ">
            hey! I am{" "}
            <span className="text-white font-medium"> Abhijith Gaganan</span>, i
            am
          </p>{" "}
          <h1 className="font-medium text-4xl md:text-7xl ">
            passionate about technology and creativity.{" "}
            <span className="text-[var(--foreground-color)] title-font ">
              I do Web + Graphic Designing.
            </span>
          </h1>
          <div className="flex gap-8 w-full justify-between items-center mt-4">
            <PrimaryButton
              text="Let's Talk"
              icon={<i className="fa-solid fa-arrow-right"></i>}
              link="#"
            />
            <div className="flex gap-4">
              <a href="">
                <i className="fa-brands fa-instagram text-3xl text-gray-400 hover:text-white "></i>
              </a>
              <a href="">
                <i className="fa-brands fa-linkedin text-3xl text-gray-400 hover:text-white "></i>
              </a>
            </div>
          </div>
        </div>
        <div className="hidden md:!flex absolute bottom-8 left-1/2 -translate-x-1/2 text-white  flex-col items-center gap-2 z-10">
          <a href="#about">
            <i className="fa-solid fa-arrow-down text-3xl animate-bounce"></i>
          </a>
        </div>
      </section>
      <hr className="h-8 bg-[var(--foreground-color)]" />
      <section
        className="h-auto md:h-screen relative overflow-hidden"
        id="about"
      ></section>
    </div>
  );
};

export default Home;
