import { Title } from "@/components/title";
import { FileForm } from "./file-form";

const Files = () => {
  return (
    <div>
      <Title className="text-3xl my-5">
        <h2>Files</h2>
      </Title>
      <FileForm connectionString={process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING || ""}/>
    </div>
  );
};

export default Files;
