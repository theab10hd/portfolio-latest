import PrimaryButton from "../Components/Buttons/PrimaryButton";
import { devStackIcons, designStackIcons } from "../../utils/techStackIcons";
// import Box from "../Components/Utils/Box";
import TechstackIcon from "../Components/Utils/TechstackIcon";
import { useRef, useState } from "react";

const Home = () => {

  const myImageRef = useRef<HTMLImageElement>(null);
  const [isMyImageVisible, setIsMyImageVisible] = useState(false);

  const handleSeeMeButtonClick = () => {
    if (!myImageRef.current) return;
    const element = myImageRef.current;
    setIsMyImageVisible(!isMyImageVisible);
    element.style.opacity = element.style.opacity === '1' ? '0' : '1';
  };

  return (
    <div className="bg-[var(--background-dark)] z-20 relative">
      {/* Hero Section */}
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
      {/* About Section */}
      <section
        className="h-auto md:max-h-screen relative overflow-hidden py-24 w-screen"
        id="about"
      >
        <div className="container mx-auto text-gray-400 ">
          <div className="grid grid-cols-2 relative z-20 gap-8">
            <div className="col">
              <div className="grid gap-8">
                <div
                  className="p-8 relative overflow-hidden rounded-xl outline-1 outline-white/10 transition-all ease-in-out duration-300 cursor-pointer 
                group"
                >
                  <img ref={myImageRef}
                    src="/images/my images/mine1.jpg"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-0 transition-all duration-300 ease-in-out z-0"
                  />

                  <div
                    className="absolute inset-0
              z-10"
                  >
                    <button onClick={handleSeeMeButtonClick} title="See My Image" className={`px-2 py-1 text-sm cursor-pointer absolute right-0 bottom-0 ${isMyImageVisible && 'text-white bg-black/80 rounded-tl-md'}`}>
                      <i className={`fa-regular ${isMyImageVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>

                  <div className="relative z-20">
                    <h1 className={`text-4xl font-bold lowercase ${isMyImageVisible ? 'text-[var(--foreground-color)]' : 'text-white'}`}>
                      {isMyImageVisible ? 'this is me!':'about me'}
                    </h1>

                    <p className={`mt-4 text-justify text-xl ${isMyImageVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                      <span className="text-white">
                        I’m Abhijith Gaganan, a technology enthusiast with a
                        deep passion for creativity and design.
                      </span>{" "}
                      I love blending logic and artistry—whether it’s building
                      functional, elegant websites or crafting eye-catching
                      graphic designs that tell a story. <br />
                      <span className="text-[var(--foreground-color)]">
                        I currently work full-time as a Software Engineer
                      </span>
                      , where I focus on creating efficient, user-friendly
                      solutions. Alongside my job, I take on freelance projects
                      in web and graphic design, helping brands bring their
                      ideas to life through clean code and thoughtful visuals.{" "}
                      <br />
                      For me, technology isn’t just a career—it’s a creative
                      playground. I’m always learning, experimenting, and
                      pushing myself to build meaningful digital experiences
                      that connect people and ideas.
                    </p>
                  </div>
                </div>

                <div className="p-8 rounded-xl outline-1 outline-transparent hover:outline-white/30 hover:bg-linear-to-b from-white/10 to-white-5 transition-alls ease-in-out duration-300 cursor-pointer hover:scale-102">
                  <h1 className="text-4xl font-bold lowercase text-white">
                    find me
                  </h1>
                </div>
              </div>
            </div>
            {/* Tech Stack */}
            <div className="col p-8 rounded-xl flex-col items-center  outline-1 outline-white/10">
              <h1 className="text-4xl font-bold lowercase text-white ">
                Technologies i work with
              </h1>
              <div className="grid grid-cols-6 gap-4 mt-4">
                <TechstackIcon text="Development" />
                {Object.keys(devStackIcons).map((key) => (
                  <TechstackIcon
                    key={key}
                    imageUrl={devStackIcons[key as keyof typeof devStackIcons]}
                  />
                ))}
                <TechstackIcon text="Designing" />
                {Object.keys(designStackIcons).map((key) => (
                  <TechstackIcon
                    key={key}
                    imageUrl={
                      designStackIcons[key as keyof typeof designStackIcons]
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="h-8 bg-[var(--foreground-color)]" />
      {/* Projects Section */}
      <section
        className="h-auto md:max-h-screen relative overflow-hidden py-24 w-screen"
        id="projects"
      >1
        swwd</section>
    </div>
  );
};

export default Home;
