import { FC } from "react";
import { SquareImagePlaceholder } from "./square-image-placeholder";
import { SquareImage } from "./square-image";

interface IProps {
  company: Company;
  size: number;
  className?: string;
}

export const CompanyImage: FC<IProps> = ({
  company,
  size,
  className = `size-${size}`,
}) => {
  if (company.logo && company.logo.trim() !== "") {
    return (
      <SquareImage
        src={company.logo}
        alt={company.name}
        size={size}
        className={className}
      />
    );
  }

  return (
    <SquareImagePlaceholder
      alt={company.name}
      size={size}
      className={className}
    />
  );
};
