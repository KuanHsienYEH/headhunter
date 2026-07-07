import { z } from 'zod'

// ── Posts ─────────────────────────────────────────────────────────────────────
export const postSchema = z.object({
  titleZh:    z.string().min(1, '標題為必填'),
  titleEn:    z.string().optional(),
  slug:       z.string().min(1).regex(/^[a-z0-9-]+$/, 'slug 只允許小寫英數字與連字號'),
  bodyZh:     z.string().optional(),
  bodyEn:     z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  lang:       z.enum(['zh', 'en', 'both']),
  status:     z.enum(['draft', 'published']),
})

export type PostInput = z.infer<typeof postSchema>

// ── Jobs ──────────────────────────────────────────────────────────────────────
export const jobSchema = z.object({
  titleZh:    z.string().min(1, '職位名稱為必填'),
  titleEn:    z.string().optional(),
  descZh:     z.string().min(1, '職位說明為必填'),
  descEn:     z.string().optional(),
  industryZh: z.string().min(1, '產業別為必填'),
  industryEn: z.string().optional(),
  location:   z.string().optional(),
  lang:       z.enum(['zh', 'en', 'both']),
  isActive:   z.boolean().default(true),
})

export type JobInput = z.infer<typeof jobSchema>

// ── Inquiry (contact form — enterprise) ───────────────────────────────────────
export const inquirySchema = z.object({
  company:     z.string().min(1, '公司名稱為必填'),
  contactName: z.string().min(1, '聯絡人姓名為必填'),
  email:       z.string().email('請輸入有效的 Email'),
  phone:       z.string().optional(),
  position:    z.string().min(1, '招募職位為必填'),
  industry:    z.string().optional(),
  budget:      z.string().optional(),
  message:     z.string().min(10, '需求說明請至少填寫 10 個字'),
})

export type InquiryInput = z.infer<typeof inquirySchema>

// ── Resume (contact form — job seeker) ────────────────────────────────────────
export const resumeMetaSchema = z.object({
  name:         z.string().min(1, '姓名為必填'),
  email:        z.string().email('請輸入有效的 Email'),
  currentTitle: z.string().optional(),
  direction:    z.string().optional(),
  // Privacy consent must be true
  consent: z.literal(true, { message: '請同意隱私聲明' }),
})

export type ResumeMetaInput = z.infer<typeof resumeMetaSchema>

// ── Banner ────────────────────────────────────────────────────────────────────
export const bannerSchema = z.object({
  title:      z.string().min(1, '標題為必填'),
  subtitle:   z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  imageUrl:   z.string().min(1, '圖片網址為必填'),
  sortOrder:  z.number().int().default(0),
  isActive:   z.boolean().default(true),
})
export type BannerInput = z.infer<typeof bannerSchema>

// ── Admin status updates ───────────────────────────────────────────────────────
export const resumeStatusSchema = z.object({
  status: z.enum(['unread', 'in_progress', 'closed']).optional(),
  note:   z.string().optional(),
})

export const inquiryStatusSchema = z.object({
  status: z.enum(['new', 'in_progress', 'closed', 'rejected']).optional(),
  note:   z.string().optional(),
})
