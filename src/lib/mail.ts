import { Resend } from 'resend'

const SITE   = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const NOTIFY = process.env.NOTIFY_EMAIL ?? ''

// Lazy — only instantiated when mail is actually sent, not at build time
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

// ── Internal notifications (to admin) ────────────────────────────────────────

export async function notifyNewResume(data: {
  id: string
  name: string
  currentTitle?: string | null
  email: string
}) {
  try {
    await getResend().emails.send({
      from:    'noreply@yourdomain.com',
      to:      NOTIFY,
      subject: `[新履歷] ${data.name}｜${data.currentTitle ?? '未填職銜'}`,
      html: `
        <p>有新的履歷登記</p>
        <ul>
          <li>姓名：${data.name}</li>
          <li>Email：${data.email}</li>
          <li>目前職銜：${data.currentTitle ?? '—'}</li>
        </ul>
        <p><a href="${SITE}/admin/resumes/${data.id}">前往後台查看</a></p>
      `,
    })
  } catch (err) {
    console.error('[mail] notifyNewResume failed:', err)
  }
}

export async function notifyNewInquiry(data: {
  id: string
  company: string
  contactName: string
  position: string
  email: string
}) {
  try {
    await getResend().emails.send({
      from:    'noreply@yourdomain.com',
      to:      NOTIFY,
      subject: `[新委託] ${data.company}｜${data.position}`,
      html: `
        <p>有新的企業委託</p>
        <ul>
          <li>公司：${data.company}</li>
          <li>聯絡人：${data.contactName}</li>
          <li>Email：${data.email}</li>
          <li>職位：${data.position}</li>
        </ul>
        <p><a href="${SITE}/admin/inquiries/${data.id}">前往後台查看</a></p>
      `,
    })
  } catch (err) {
    console.error('[mail] notifyNewInquiry failed:', err)
  }
}

// ── Confirmation emails (to submitter) ───────────────────────────────────────

export async function confirmResume(to: string, name: string) {
  try {
    await getResend().emails.send({
      from:    'noreply@yourdomain.com',
      to,
      subject: '已收到您的履歷登記',
      html: `
        <p>${name} 您好，</p>
        <p>我們已收到您的履歷，顧問將在 2 個工作日內與您聯繫。</p>
        <p>您的資料以加密方式儲存，僅顧問本人閱覽，如需刪除請回覆此信。</p>
      `,
    })
  } catch (err) {
    console.error('[mail] confirmResume failed:', err)
  }
}

export async function confirmInquiry(to: string, company: string) {
  try {
    await getResend().emails.send({
      from:    'noreply@yourdomain.com',
      to,
      subject: '已收到您的獵才委託',
      html: `
        <p>您好，</p>
        <p>感謝 ${company} 的委託，我們通常在 1 個工作日內回覆，感謝您的耐心等候。</p>
      `,
    })
  } catch (err) {
    console.error('[mail] confirmInquiry failed:', err)
  }
}
