/* 法令專區連結 — footer 與 /legal 頁共用;PDF 檔案放 public/documents/ 後即可下載 */

export interface LegalLink {
  zh: string
  en: string
  href: string
}

/* 政府資訊連結 — 一律另開分頁 */
export const govLinks: LegalLink[] = [
  {
    zh: '職業介紹服務及定型化契約',
    en: 'Standard Placement Service Contract (Taipei Labor Bureau)',
    href: 'https://bola.gov.taipei/News_Content.aspx?n=9C30ECD2C9D31116&s=0715792440415ED4',
  },
  {
    zh: '求職防騙宣導',
    en: 'Job Scam Prevention (Taipei Labor Bureau)',
    href: 'https://bola.gov.taipei/News_Content.aspx?n=9C30ECD2C9D31116&sms=B81E4E16FE8825B0&s=A520830439CE2567',
  },
  {
    zh: '個人隱私及防止性騷擾及其他就業相關訊息',
    en: 'Privacy, Harassment Prevention & Employment Info (Taipei Labor Bureau)',
    href: 'https://bola.gov.taipei/News.aspx?n=AE55982A24210512&sms=C0732F482B9AB149',
  },
  {
    zh: '雇主違法公告連結',
    en: 'Employer Violation Registry (Ministry of Labor)',
    href: 'https://announcement.mol.gov.tw/',
  },
]

/* 巨將自有文件(PDF)— 檔名對應 public/documents/ */
export const companyDocs: LegalLink[] = [
  { zh: '巨將就業服務許可證',                     en: 'JuJiang Employment Service License',                                  href: '/documents/license.pdf' },
  { zh: '巨將申訴流程處理機制',                   en: 'JuJiang Complaint Handling Process',                                  href: '/documents/complaint-process.pdf' },
  { zh: '巨將就業服務專業人員證書',               en: 'JuJiang Employment Service Professional Certificates',                href: '/documents/professional-certificates.pdf' },
  { zh: '巨將收費項目及金額明細表',               en: 'JuJiang Fee Schedule',                                                href: '/documents/fee-schedule.pdf' },
  { zh: '巨將性騷擾防治措施、申訴及調查處理要點', en: 'JuJiang Sexual Harassment Prevention, Complaint & Investigation Guidelines', href: '/documents/harassment-complaint-guidelines.pdf' },
  { zh: '巨將工作場所性騷擾防治措施及懲戒規範',   en: 'JuJiang Workplace Harassment Prevention & Disciplinary Rules',        href: '/documents/harassment-discipline-rules.pdf' },
]
