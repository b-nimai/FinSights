import { neon } from '@neondatabase/serverless';
import "dotenv/config";

// create a SQL connection using database URL
export const sql = neon(process.env.DATABASE_URL);

