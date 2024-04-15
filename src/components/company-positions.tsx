import { FC } from "react";
import { PositionCards } from "./position-cards";
import { getPositionsForCompany } from "@/actions/position";
import { getCompany } from "@/actions/company";
import { notFound } from "next/navigation";

interface IProps {
  companyId: string;
}

export const CompanyPositions: FC<IProps> = async ({ companyId }) => {
  const company = await getCompany(companyId);
  if (company === undefined) {
    notFound();
  }
  const positions = await getPositionsForCompany(companyId);

  return positions.length === 0 ? (
    <div>
      <h3>Currently there are no open positions</h3>
    </div>
  ) : (
    <section className="flex flex-wrap gap-12 justify-center">
      <PositionCards
        positions={positions.map((position) => {
          return { ...position, company };
        })}
      />
    </section>
  );
};
