import { neon } from '@neondatabase/serverless'
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type AppDB = NeonHttpDatabase<typeof schema> & { $client: ReturnType<typeof neon> }

let _instance: AppDB | null = null

function getInstance(): AppDB {
  if (_instance) return _instance
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  const sql = neon(process.env.DATABASE_URL)
  _instance = drizzle(sql, { schema }) as AppDB
  return _instance
}

// Proxy so callers write `db.select(...)` — instance is created on first API call, not at build time
export const db: AppDB = new Proxy({} as AppDB, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(_t, prop) { return (getInstance() as any)[prop] },
})

export type DB = AppDB
