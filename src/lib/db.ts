"use server"

import postgres from 'postgres'

const connection = process.env.DB_CONNECTION ?? ""

export const sql = postgres(connection)