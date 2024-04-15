import { sql } from "./db";

export const updatePhoto = async (userId: string, path: string) => {
  try {
    await sql`
        UPDATE users
        SET photo = ${path}
        WHERE public_id = ${userId}
    `;

    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};
