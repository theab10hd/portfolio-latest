type BoxProps = {
  width?: number;
  backgroundColor?: string;
  className?: string;
};

const Box = ({ width, backgroundColor, className }: BoxProps) => {
  return (
    <div
      className={`aspect-square relative ${className}`}
      style={{
        width: `${width}rem`,
        backgroundColor: backgroundColor,
      }}
    />
  );
};
export default Box;
