'use server';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL

export async function getData() {
   if (databaseUrl) {
    const sql = neon(databaseUrl);
    const data = await sql`...`;
    return data;
   }
}