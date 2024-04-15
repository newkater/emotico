import { Saving } from "@/components/saving";

const message = "The system is analyzing the interview"
const saving = "Your answers are being evaluated."

const Loading = () => {
    return <Saving message={message} saving={saving} />;
}

export default Loading