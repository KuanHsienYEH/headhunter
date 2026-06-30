import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId:     process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.S3_BUCKET_NAME!

/**
 * Upload a resume PDF to S3.
 * Returns the object key (never a public URL).
 */
export async function uploadResume(
  buffer: Buffer,
  originalName: string,
): Promise<string> {
  const ext = originalName.split('.').pop() ?? 'pdf'
  const key = `resumes/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  await s3.send(
    new PutObjectCommand({
      Bucket:      BUCKET,
      Key:         key,
      Body:        buffer,
      ContentType: 'application/pdf',
      // No ACL — bucket is private
    }),
  )

  return key
}

/**
 * Generate a signed URL valid for 15 minutes.
 * Always call this from a server-side handler, never expose the URL to cache.
 */
export async function getResumeSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key })
  return getSignedUrl(s3, command, { expiresIn: 900 }) // 15 min
}

/**
 * Permanently delete a resume file from S3.
 * Call this only when deleting the DB record too.
 */
export async function deleteResume(key: string): Promise<void> {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }))
}
