import { Saving } from "./saving";

const congrats = "You have answered all the given questions, well done!";
const recording = "Your answers are being recorded now.";

export const ApplicationSaving = () => {
  return <Saving message={congrats} saving={recording} />;
};
