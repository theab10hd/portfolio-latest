type TechstackIconProps = {
  text?: string;
  imageUrl?: string;
  className?: string;
  outlineColor?: string;
};

const outlineColors: Record<string, string> = {
  orange: "outline-orange-500/50",
  red: "outline-red-500/50",
  blue: "outline-blue-500/50",
};

const TechstackIcon = ({
  imageUrl = "https://dummyimage.com/600x400/000/fff",
  className = "",
  text,
  outlineColor,
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
          className={`aspect-square object-cover outline-1 p-1 ${
            outlineColor ? outlineColors[outlineColor] : "outline-white/10"
          } rounded-lg hover:scale-105 ease-in-out duration-300 cursor-pointer ${className}`}
        />
      )}
    </>
  );
};

export default TechstackIcon;
