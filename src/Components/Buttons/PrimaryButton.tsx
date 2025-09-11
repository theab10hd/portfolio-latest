import React from "react";
import type { PrimaryButtonProps } from "../../../utils/types";

const PrimaryButton = ({ text, icon, className, link }: PrimaryButtonProps) => {
  return (
    <div
      className={`border-2 px-4 py-2 rounded-full  w-fit   cursor-pointer hover:border-transparent hover:bg-[var(--foreground-color)] duration-150 transition-all ease-in-out  ${
        className && className
      }`}
    >
      <a
        href={link}
        className="flex justify-between items-center gap-4 hover:gap-8  duration-150 transition-all ease-in-out "
      >
        {text}
        {icon}
      </a>
    </div>
  );
};

export default PrimaryButton;
