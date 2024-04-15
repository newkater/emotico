import { Title } from "@/components/title";
import { CreatePositionForm } from "./create-position-form";
import { getUserRole } from "@/lib/auth";

const CreatePositionPage = async () => {
  const role = await getUserRole();

  if (role !== "RECRUITER") {
    return (
      <div>
        <Title>
          <h2 className="text-3xl my-5">No Access To Create Positions</h2>
        </Title>
      </div>
    );
  }

  return (
    <div>
      <Title>
        <h2 className="text-3xl my-5">Add Position</h2>
      </Title>
      <CreatePositionForm />
    </div>
  );
};

export default CreatePositionPage;
