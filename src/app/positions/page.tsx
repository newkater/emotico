import { getPositions } from "@/actions/position";
import { PositionCardAdd } from "@/components/position-card-add";
import { PositionCards } from "@/components/position-cards";
import { Title } from "@/components/title";
import { getUserRole } from "@/lib/auth";

const PositionsPage = async () => {
  const positions = (await getPositions()) ?? [];
  const role = await getUserRole();

  return (
    <div>
      <Title className="text-3xl flex justify-center pt-8 pb-6">
        <h2>Positions:</h2>
      </Title>
      <section className="flex flex-wrap gap-12 justify-center">
        {role === "RECRUITER" && <PositionCardAdd />}
        <PositionCards
          positions={
            positions?.map((position) => {
              return {
                ...position,
                recruiter_public_id: "",
                description: "",
                company: { ...position.company, description: "" },
              };
            }) ?? []
          }
        />
      </section>
    </div>
  );
};

export default PositionsPage;
