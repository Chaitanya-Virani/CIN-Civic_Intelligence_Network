import postgres from "postgres";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sql = postgres({
  host: "db.yclgmvhyzrujbpasoxqx.supabase.co",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "!Q!5mi2EYL!VTqu",
  ssl: "require",
});

async function run() {
  try {
    console.log("Connecting to Supabase database...");
    
    // 1. Run migrations/0001_init.sql
    const initSqlPath = path.join(__dirname, "../supabase/migrations/0001_init.sql");
    const initSql = fs.readFileSync(initSqlPath, "utf8");
    console.log("Running schema migration 0001_init.sql...");
    await sql.unsafe(initSql);
    console.log("✅ Schema created successfully.");

    // 2. Run seed.sql
    const seedSqlPath = path.join(__dirname, "../supabase/seed.sql");
    const seedSql = fs.readFileSync(seedSqlPath, "utf8");
    console.log("Running seed data script seed.sql...");
    await sql.unsafe(seedSql);
    console.log("✅ Seed data inserted successfully.");

    // Verify by listing tenants
    const tenants = await sql`SELECT slug, name, features FROM tenants`;
    console.log("Active tenants in DB:", tenants);

  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

run();
