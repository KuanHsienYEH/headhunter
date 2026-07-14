import { deleteResume, getResumeSignedUrl, uploadResume } from '../s3'
import { deleteResumeFile, resolveResumeUrl, saveResumeFile } from '../resume-storage'

jest.mock('../s3', () => ({
  uploadResume: jest.fn(),
  getResumeSignedUrl: jest.fn(),
  deleteResume: jest.fn(),
}))

const mockedUploadResume = jest.mocked(uploadResume)
const mockedGetResumeSignedUrl = jest.mocked(getResumeSignedUrl)
const mockedDeleteResume = jest.mocked(deleteResume)

describe('resume-storage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([
    ['resume.PDF', '.pdf', 'application/pdf'],
    ['resume.doc', '.doc', 'application/msword'],
    [
      'resume.docx',
      '.docx',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  ])('uploads %s with a UUID filename and correct content type', async (originalName, extension, contentType) => {
    const buffer = Buffer.from('resume')
    mockedUploadResume.mockResolvedValue(`dev/resumes/generated${extension}`)

    const fileKey = await saveResumeFile(buffer, originalName)

    expect(mockedUploadResume).toHaveBeenCalledWith(
      buffer,
      expect.stringMatching(new RegExp(`^[0-9a-f-]{36}\\${extension}$`)),
      originalName,
      contentType,
    )
    expect(fileKey).toBe(`dev/resumes/generated${extension}`)
  })

  it('rejects unsupported resume extensions before uploading', async () => {
    await expect(saveResumeFile(Buffer.from('resume'), 'resume.txt')).rejects.toThrow(
      '僅支援 PDF、DOC、DOCX 履歷',
    )
    expect(mockedUploadResume).not.toHaveBeenCalled()
  })

  it('uses the complete DB fileKey unchanged for signed URLs', async () => {
    const fileKey = 'prod/resumes/resume-id.pdf'
    mockedGetResumeSignedUrl.mockResolvedValue('https://signed.example/resume')

    await expect(resolveResumeUrl(fileKey)).resolves.toBe('https://signed.example/resume')
    expect(mockedGetResumeSignedUrl).toHaveBeenCalledWith(fileKey)
  })

  it('uses the complete DB fileKey unchanged when deleting', async () => {
    const fileKey = 'prod/resumes/resume-id.docx'
    mockedDeleteResume.mockResolvedValue()

    await deleteResumeFile(fileKey)

    expect(mockedDeleteResume).toHaveBeenCalledWith(fileKey)
  })
})
