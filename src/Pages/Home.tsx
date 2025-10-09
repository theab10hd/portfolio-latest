import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Box from "../Components/Utils/Box";

const Home = () => {
  return (
    <div className="bg-[var(--background-dark)] z-20 relative">
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
            <span className="text-[var(--foreground-color)] title-font">
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
        className="h-auto md:h-screen relative overflow-hidden pt-24 "
        id="about"
      >
        {/* Custom Box */}
        <div className="absolute z-10">
          <Box
            width={10}
            backgroundColor="var(--foreground-color)"
            className="top-[0rem] left-8 opacity-60 rounded-lg"
          />
        </div>
        <div className="container mx-auto p-8 text-gray-400 ">
          <div className="grid grid-cols-2 relative z-20">
            <div className="col-span-1">
              <h1 className="text-4xl font-bold uppercase  underline-offset-4 underline">
                #About Me.
              </h1>
              <p className="mt-4 text-justify  ">
                <span className="text-white">
                  {" "}
                  I’m Abhijith Gaganan, a technology enthusiast with a deep
                  passion for creativity and design.
                </span>{" "}
                I love blending logic and artistry—whether it’s building
                functional, elegant websites or crafting eye-catching graphic
                designs that tell a story. <br />
                <span className="text-[var(--foreground-color)]">
                  I currently work full-time as a Software Engineer
                </span>
                , where I focus on creating efficient, user-friendly solutions.
                Alongside my job, I also take on freelance projects in web and
                graphic design, helping brands and individuals bring their ideas
                to life through clean code and thoughtful visuals. <br /> For
                me, technology isn’t just a career—it’s a creative playground.
                I’m always learning, experimenting, and pushing myself to create
                meaningful digital experiences that connect people and ideas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
