import { FC } from "react";
import { imageIcon } from "@/assets/images";
import { SquareImage } from "./square-image";
import { cn } from "@/lib/utils";

interface IProps {
  size: number;
  alt: string;
  className?: string;
}

export const SquareImagePlaceholder: FC<IProps> = ({ size, alt, className = `size-${size}` }) => {
  return <SquareImage src={imageIcon} alt={alt} size={size} className={cn(className, "opacity-50")} />;
};
