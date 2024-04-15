import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  size: number;
  src: string;
  alt: string;
  className?: string;
}

export const SquareImage: FC<IProps> = ({
  size,
  src,
  alt,
  className = "size-32",
}) => {
  return (
    <div className={cn("relative block", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size * 4}px`}
        className="object-cover w-full h-full"
      />
    </div>
  );
};
