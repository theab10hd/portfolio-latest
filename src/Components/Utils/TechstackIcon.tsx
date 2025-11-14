type TechstackIconProps = {
  text?: string;
  imageUrl?: string;
  className?: string;
};

const TechstackIcon = ({
  imageUrl = "https://dummyimage.com/600x400/000/fff",
  className = "",
  text,
}: TechstackIconProps) => {
  return (
    <>
      {text ? (
        <div className="aspect-square flex flex-col justify-center gap-1 text-white/80 items-center">
          <p className="">{text}</p>
          <i className="fa-solid fa-arrow-right text-2xl"></i>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt=""
          className={`aspect-square object-cover border-b border-transparent hover:border-white  outline-1 p-1 outline-white/10 hover:outline-white/30 rounded-lg hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer ${className}`}
        />
      )}
    </>
  );
};

export default TechstackIcon;
