import { resumeMetaSchema, inquirySchema, jobSchema } from '../validations'

describe('resumeMetaSchema(履歷/應徵)', () => {
  const valid = { name: '王測試', email: 'a@b.com', consent: true as const }

  it('合法資料通過', () => {
    expect(resumeMetaSchema.safeParse(valid).success).toBe(true)
  })

  it('未勾個資同意一律擋下', () => {
    expect(resumeMetaSchema.safeParse({ ...valid, consent: false }).success).toBe(false)
    expect(resumeMetaSchema.safeParse({ ...valid, consent: 'true' }).success).toBe(false)
  })

  it('email 格式錯誤擋下', () => {
    expect(resumeMetaSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false)
  })

  it('jobId 必須是 uuid(應徵職缺關聯)', () => {
    expect(resumeMetaSchema.safeParse({ ...valid, jobId: 'abc' }).success).toBe(false)
    expect(resumeMetaSchema.safeParse({ ...valid, jobId: '6ce75509-38fa-472d-a11e-80b117315d43' }).success).toBe(true)
  })
})

describe('inquirySchema(企業委託)', () => {
  const valid = {
    company: '巨將', contactName: '張小姐', email: 'x@y.com',
    position: '財務長', message: '需求說明至少要有十個字喔',
  }

  it('合法資料通過', () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true)
  })

  it('需求說明少於 10 字擋下', () => {
    expect(inquirySchema.safeParse({ ...valid, message: '太短' }).success).toBe(false)
  })
})

describe('jobSchema(職缺固定欄位)', () => {
  const valid = { titleZh: '財務長', descZh: '工作內容', industryZh: '電子科技', lang: 'zh' as const }

  it('工作性質/薪資未填時帶預設值', () => {
    const parsed = jobSchema.parse(valid)
    expect(parsed.employmentType).toBe('全職')
    expect(parsed.salary).toBe('面議')
  })
})
