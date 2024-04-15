import { sql } from "./db";

export const deleteQuestion = async (questionId: string) => {
  try {
    await sql`
        DELETE FROM questions
        WHERE public_id = ${questionId}
      `;

    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};

export const updateQuestion = async (
  questionId: string,
  name: string,
  readDuration: number,
  answerDuration: number
) => {
  try {
    await sql`
    UPDATE questions
    SET name = ${name}, read_duration = ${readDuration}, answer_duration = ${answerDuration}
    WHERE public_id = ${questionId}
      `;

    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};
