import { randomUUID } from 'crypto'
import path from 'path'
import { deleteResume, getResumeSignedUrl, uploadResume } from './s3'

const RESUME_CONTENT_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

/** Validate and upload a resume, returning the complete S3 object key. */
export async function saveResumeFile(buffer: Buffer, originalName: string): Promise<string> {
  const extension = path.extname(originalName).toLowerCase()
  const contentType = RESUME_CONTENT_TYPES[extension]

  if (!contentType) {
    throw new Error('僅支援 PDF、DOC、DOCX 履歷')
  }

  const filename = `${randomUUID()}${extension}`
  return uploadResume(buffer, filename, originalName, contentType)
}

/** Create a fresh 15-minute S3 signed download URL. */
export async function resolveResumeUrl(fileKey: string): Promise<string> {
  return getResumeSignedUrl(fileKey)
}

/** Delete the S3 object referenced by the complete DB fileKey. */
export async function deleteResumeFile(fileKey: string): Promise<void> {
  await deleteResume(fileKey)
}
