import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon, NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePg, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

type AppDB = NeonHttpDatabase<typeof schema> | NodePgDatabase<typeof schema>

let _instance: AppDB | null = null

// 本地開發連一般 Postgres (pg driver);雲端連 Neon serverless HTTP driver
function isLocalUrl(url: string) {
  try {
    const host = new URL(url).hostname
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]'
  } catch {
    return false
  }
}

function getInstance(): AppDB {
  if (_instance) return _instance
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }
  if (isLocalUrl(url)) {
    const pool = new Pool({ connectionString: url })
    _instance = drizzlePg(pool, { schema })
  } else {
    const sql = neon(url)
    _instance = drizzleNeon(sql, { schema })
  }
  return _instance
}

// Proxy so callers write `db.select(...)` — instance is created on first API call, not at build time
export const db: AppDB = new Proxy({} as AppDB, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(_t, prop) { return (getInstance() as any)[prop] },
})

export type DB = AppDB
