/**
 * Create the first admin account.
 * Run once: npx tsx scripts/seed-admin.ts
 *
 * Set ADMIN_EMAIL and ADMIN_PASSWORD as env vars, or edit below.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import bcrypt from 'bcryptjs'
import { db } from '../src/db'
import { admins } from '../src/db/schema'

const EMAIL    = process.env.ADMIN_EMAIL    ?? 'admin@example.com'
const PASSWORD = process.env.ADMIN_PASSWORD ?? 'change-me-immediately'

async function main() {
  const hash = await bcrypt.hash(PASSWORD, 12)

  const [admin] = await db
    .insert(admins)
    .values({ email: EMAIL, passwordHash: hash })
    .onConflictDoNothing()
    .returning()

  if (admin) {
    console.log(`✓ Admin created: ${admin.email}`)
  } else {
    console.log(`ℹ Admin already exists: ${EMAIL}`)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
