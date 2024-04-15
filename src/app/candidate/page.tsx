import { getCandidateAccount, postVerify } from "@/actions/account";
import { get } from "@/lib/api";
import { httpGet } from "@/lib/http";
import { getInterviews, selectInterviews } from "@/lib/interview";
import React from "react";
import { logger } from "@/lib/logging"
const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;
const connectionString = process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING ?? ""

const CandidatePage = async () => {
  const candidate = await getCandidateAccount()
  const log = logger(connectionString)

  const messages: string[] = []

  try {
    const interviews = candidate !== undefined ? await httpGet<unknown>(`${baseurl}/candidate/${candidate?.public_id}/interviews`) : undefined;
    messages.push(JSON.stringify(interviews))
    log.info("interviews", JSON.stringify(interviews, null, "  "))
  } catch (error) {
    messages.push(JSON.stringify(error))
    log.error("interviews", JSON.stringify(error, null, "  "))
  }
  try {
    const interviewsAxios = await get(`${baseurl}/candidate/${candidate?.public_id}/interviews`);
    messages.push(JSON.stringify(interviewsAxios.data))
  } catch (error) {
    messages.push(JSON.stringify(error))
  }
  
  //const interviewsApi = await getInterviews() 
  //const select = await selectInterviews()
  const verify = await postVerify()
  // console.log("candidate page", { interviews });
  return <div>
    <div>{JSON.stringify(candidate)}</div>
    <div>{JSON.stringify(verify)}</div>
    <div>
      {messages.map((message, index) => <div key={index}>{index}. {message}</div>)}
    </div>
    </div>;
};

export default CandidatePage;
