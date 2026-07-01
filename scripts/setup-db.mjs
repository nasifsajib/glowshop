import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUPABASE_URL = "https://lokchhaitjizdgqfujir.supabase.co"
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxva2NoaGFpdGppemRncWZ1amlyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjkwOTkzOSwiZXhwIjoyMDk4NDg1OTM5fQ.RzzuMZ2ZH3Nv3v0CKKDrSWskz63KFAY4E72h72PInwI"

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

async function execSQL(sql) {
  const { data, error } = await supabase.rpc("exec_sql", { query: sql })
  if (error) throw error
  return data
}

async function main() {
  console.log("Setting up GlowShop database...")

  // Step 1: Run migration SQL
  console.log("Creating tables...")
  try {
    const migrationSQL = readFileSync(join(__dirname, "..", "supabase", "migration.sql"), "utf8")
    await execSQL(migrationSQL)
    console.log("Tables created successfully")
  } catch (e) {
    console.log("Note: exec_sql not available, will seed data directly if tables exist")
    console.log("If tables don't exist yet, run migration.sql in Supabase SQL Editor first")
  }

  // Step 2: Seed categories
  console.log("Seeding categories...")
  const { error: catErr } = await supabase.from("categories").upsert([
    { name: "Skincare", image: "/images/skincare.jpg", item_count: 245 },
    { name: "Makeup", image: "/images/makeup.jpg", item_count: 189 },
    { name: "Hair Care", image: "/images/haircare.jpg", item_count: 134 },
    { name: "Body Care", image: "/images/bodycare.jpg", item_count: 98 },
    { name: "Sunscreen", image: "/images/sunscreen.jpg", item_count: 67 },
    { name: "Fragrance", image: "/images/fragrance.jpg", item_count: 112 },
    { name: "Korean Beauty", image: "/images/kbeauty.jpg", item_count: 203 },
  ], { onConflict: "name" })
  if (catErr) console.log("Categories seed error:", catErr.message)
  else console.log("Categories seeded")

  // Step 3: Seed brands
  console.log("Seeding brands...")
  const { error: brErr } = await supabase.from("brands").upsert([
    { name: "GlowLab", logo: "/images/glowlab.png", description: "Premium Korean skincare" },
    { name: "DewySkin", logo: "/images/dewyskin.png", description: "Hydration experts" },
    { name: "PureGlow", logo: "/images/pureglow.png", description: "Clean beauty" },
    { name: "VelvetTouch", logo: "/images/velvettouch.png", description: "Luxury makeup" },
    { name: "BloomEssentials", logo: "/images/bloom.png", description: "Natural ingredients" },
    { name: "RadianceCo", logo: "/images/radiance.png", description: "Brightening solutions" },
  ], { onConflict: "name" })
  if (brErr) console.log("Brands seed error:", brErr.message)
  else console.log("Brands seeded")

  // Step 4: Create admin user via Auth admin API
  console.log("Creating admin user...")
  const { data: user, error: authErr } = await supabase.auth.admin.createUser({
    email: "admin@glowshop.com",
    password: "admin123",
    email_confirm: true,
    user_metadata: { role: "admin", name: "Admin" },
  })
  if (authErr) {
    console.log("Admin user creation error:", authErr.message)
    console.log("(Admin user may already exist)")
  } else {
    console.log("Admin user created:", user.user.id)
    // Create profile
    const { error: profErr } = await supabase.from("profiles").upsert({
      id: user.user.id,
      name: "Admin",
      email: "admin@glowshop.com",
      role: "admin",
    }, { onConflict: "id" })
    if (profErr) console.log("Profile error:", profErr.message)
    else console.log("Admin profile created")
  }

  console.log("Setup complete!")
}

main().catch(console.error)
