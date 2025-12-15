import { Pool } from "pg";
import "dotenv/config";

async function init() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    );
  `);

  await pool.end();
  console.log("Todos table created (if not exists).");
}

init();
