import { Saving } from "./saving";

const message = "The system is analyzing the interview"
const saving = "Your answers are being evaluated."

export const ApplicationSavingResults = () => {
  return <Saving message={message} saving={saving} />;
};
