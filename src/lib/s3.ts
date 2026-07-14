import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const REQUIRED_ENV_VARS = [
  'S3_REGION',
  'S3_BUCKET_NAME',
  'S3_PREFIX',
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
] as const

type ResumeS3Config = {
  region: string
  bucket: string
  prefix: string
  accessKeyId: string
  secretAccessKey: string
}

function getResumeS3Config(): ResumeS3Config {
  const missing = REQUIRED_ENV_VARS.filter(name => !process.env[name]?.trim())
  if (missing.length > 0) {
    throw new Error(`Missing required S3 environment variables: ${missing.join(', ')}`)
  }

  return {
    region: process.env.S3_REGION!.trim(),
    bucket: process.env.S3_BUCKET_NAME!.trim(),
    prefix: process.env.S3_PREFIX!.trim(),
    accessKeyId: process.env.S3_ACCESS_KEY_ID!.trim(),
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!.trim(),
  }
}

let client: S3Client | null = null

function getS3Client(config: ResumeS3Config): S3Client {
  if (!client) {
    client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    })
  }
  return client
}

/** Upload a private resume and return its complete S3 object key. */
export async function uploadResume(
  buffer: Buffer,
  filename: string,
  originalName: string,
  contentType: string,
): Promise<string> {
  const config = getResumeS3Config()
  const key = `${config.prefix}/resumes/${filename}`

  try {
    await getS3Client(config).send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ContentDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(originalName)}`,
      }),
    )
    return key
  } catch (error) {
    console.error('[resume-s3] Upload failed', { bucket: config.bucket, key, error })
    throw new Error(`Failed to upload resume to S3: ${key}`, { cause: error })
  }
}

/** Generate a signed download URL valid for 15 minutes. */
export async function getResumeSignedUrl(fileKey: string): Promise<string> {
  const config = getResumeS3Config()

  try {
    const command = new GetObjectCommand({ Bucket: config.bucket, Key: fileKey })
    return await getSignedUrl(getS3Client(config), command, { expiresIn: 900 })
  } catch (error) {
    console.error('[resume-s3] Failed to create signed URL', {
      bucket: config.bucket,
      key: fileKey,
      error,
    })
    throw new Error(`Failed to create signed resume URL: ${fileKey}`, { cause: error })
  }
}

/** Permanently delete a resume using the complete object key stored in the DB. */
export async function deleteResume(fileKey: string): Promise<void> {
  const config = getResumeS3Config()

  try {
    await getS3Client(config).send(
      new DeleteObjectCommand({ Bucket: config.bucket, Key: fileKey }),
    )
  } catch (error) {
    console.error('[resume-s3] Delete failed', { bucket: config.bucket, key: fileKey, error })
    throw new Error(`Failed to delete resume from S3: ${fileKey}`, { cause: error })
  }
}
