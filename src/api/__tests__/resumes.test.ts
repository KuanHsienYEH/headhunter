import { createResume } from '../resumes'

describe('createResume', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    Reflect.deleteProperty(global, 'fetch')
  })

  it('Vercel 拒絕過大 payload 時顯示可理解的錯誤', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 413,
      headers: { get: () => 'text/plain; charset=utf-8' },
    } as Response)

    const file = new File(['resume'], 'resume.pdf', { type: 'application/pdf' })

    await expect(createResume({
      name: 'Test User',
      email: 'test@example.com',
      file,
    })).rejects.toThrow('履歷檔案過大，請壓縮至 4MB 以下')
  })
})
