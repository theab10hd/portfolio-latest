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
          className={`aspect-square object-cover border-b border-transparent outline-1 p-1 outline-white/10 rounded-xl cursor-pointer ${className}`}
        />
      )}
    </>
  );
};

export default TechstackIcon;
