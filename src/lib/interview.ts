"use server"

import { v4 as uuid } from "uuid";
import { sql } from "./db";
import axios from "axios";
const baseurl = process.env.NEXT_PUBLIC_API_URL;

const results = '{"score": 17, "video": "https://example.com/interview_video", "questions": [{"score": 8, "question": "What is your experience with object-oriented programming?", "evaluation": "Good", "video_link": "https://example.com/video1", "emotion_results": [{"emotion": "Happiness", "duration": 10.2, "exact_time": 24.5}, {"emotion": "Neutral", "duration": 5.7, "exact_time": 36.2}]}, {"score": 9, "question": "Describe a challenging project you have worked on.", "evaluation": "Excellent performance with exceptional problem-solving skills", "video_link": "https://example.com/video2", "emotion_results": [{"emotion": "Confidence", "duration": 8.5, "exact_time": 45.8}, {"emotion": "Determination", "duration": 7.1, "exact_time": 56.3}]}]}'

export const insertInterview = async (
  candidateId: string,
  positionId: string
) => {
  try {
    const interviewId = uuid();

    await sql`
      INSERT INTO interviews (public_id, results)
      VALUES (${interviewId}, ${results})
    `;

    await sql`
      INSERT INTO user_interviews
      SELECT 
        id,
        (SELECT id FROM positions WHERE public_id = ${positionId}),
        (SELECT id FROM interviews WHERE public_id = ${interviewId})
      FROM candidates WHERE public_id = ${candidateId}
    `;

    return interviewId;
  } catch (error) {
    console.error({ error });
    return undefined;
  }
};

export const selectInterviews = async () => {
  try {
    return await sql`
    SELECT public_id, status, results
    FROM interviews
  `;
  } catch (error) {
    return JSON.stringify(error)
  }
}

export const getInterviews = async () => {
  const response = await axios.get(baseurl + "/interviews")
  return response?.data
}
