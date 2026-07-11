import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

// ── posts ─────────────────────────────────────────────────────────────────────
export const posts = pgTable('posts', {
  id:          uuid('id').primaryKey().defaultRandom(),
  titleZh:     text('title_zh').notNull(),
  titleEn:     text('title_en'),
  slug:        text('slug').unique().notNull(),
  bodyZh:      text('body_zh'),
  bodyEn:      text('body_en'),
  coverImage:  text('cover_image'),
  // 'zh' | 'en' | 'both'
  lang:        text('lang').notNull().default('zh'),
  // 'draft' | 'published'
  status:      text('status').notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt:   timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ── jobs ──────────────────────────────────────────────────────────────────────
export const jobs = pgTable('jobs', {
  id:          uuid('id').primaryKey().defaultRandom(),
  titleZh:     text('title_zh').notNull(),
  titleEn:     text('title_en'),
  descZh:      text('desc_zh').notNull(),
  descEn:      text('desc_en'),
  industryZh:  text('industry_zh').notNull(),
  industryEn:  text('industry_en'),
  location:    text('location'),
  // 固定欄位:工作性質 / 薪資待遇 / 學歷科系 / 工作年資 / 其他條件
  employmentType: text('employment_type').notNull().default('全職'),
  salary:         text('salary').notNull().default('面議'),
  education:      text('education'),
  experience:     text('experience'),
  requirements:   text('requirements'),
  // 'zh' | 'en' | 'both'
  lang:        text('lang').notNull().default('zh'),
  isActive:    boolean('is_active').notNull().default(true),
  createdAt:   timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ── resumes ───────────────────────────────────────────────────────────────────
export const resumes = pgTable('resumes', {
  id:           uuid('id').primaryKey().defaultRandom(),
  name:         text('name').notNull(),
  email:        text('email').notNull(),
  currentTitle: text('current_title'),
  direction:    text('direction'),
  // 應徵的職缺(從職缺詳情頁投遞時記錄;一般履歷登記為 null)
  jobId:        uuid('job_id').references(() => jobs.id, { onDelete: 'set null' }),
  // S3 object key — never a public URL
  fileKey:      text('file_key').notNull(),
  originalName: text('original_name').notNull(),
  fileSize:     integer('file_size'),
  // 'unread' | 'in_progress' | 'closed'
  status:       text('status').notNull().default('unread'),
  note:         text('note'),
  createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:    timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ── inquiries ─────────────────────────────────────────────────────────────────
export const inquiries = pgTable('inquiries', {
  id:          uuid('id').primaryKey().defaultRandom(),
  company:     text('company').notNull(),
  contactName: text('contact_name').notNull(),
  email:       text('email').notNull(),
  phone:       text('phone'),
  position:    text('position').notNull(),
  industry:    text('industry'),
  budget:      text('budget'),
  message:     text('message').notNull(),
  // 'new' | 'in_progress' | 'closed' | 'rejected'
  status:      text('status').notNull().default('new'),
  note:        text('note'),
  createdAt:   timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ── banners ───────────────────────────────────────────────────────────────────
export const banners = pgTable('banners', {
  id:         uuid('id').primaryKey().defaultRandom(),
  title:      text('title').notNull(),
  subtitle:   text('subtitle'),
  buttonText: text('button_text'),
  buttonLink: text('button_link'),
  imageUrl:   text('image_url').notNull(),
  sortOrder:  integer('sort_order').notNull().default(0),
  isActive:   boolean('is_active').notNull().default(true),
  createdAt:  timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:  timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ── awards ── 評鑑與獎項(獎狀圖片)────────────────────────────────────────────
export const awards = pgTable('awards', {
  id:        uuid('id').primaryKey().defaultRandom(),
  title:     text('title').notNull(),
  imageUrl:  text('image_url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive:  boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ── admins ────────────────────────────────────────────────────────────────────
export const admins = pgTable('admins', {
  id:           uuid('id').primaryKey().defaultRandom(),
  email:        text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ── Types ─────────────────────────────────────────────────────────────────────
export type Post      = typeof posts.$inferSelect
export type NewPost   = typeof posts.$inferInsert
export type Job       = typeof jobs.$inferSelect
export type NewJob    = typeof jobs.$inferInsert
export type Resume    = typeof resumes.$inferSelect
export type NewResume = typeof resumes.$inferInsert
export type Inquiry   = typeof inquiries.$inferSelect
export type NewInquiry = typeof inquiries.$inferInsert
export type Admin     = typeof admins.$inferSelect
export type Banner    = typeof banners.$inferSelect
export type NewBanner = typeof banners.$inferInsert
export type Award     = typeof awards.$inferSelect
export type NewAward  = typeof awards.$inferInsert
