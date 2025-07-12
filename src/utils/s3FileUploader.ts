import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import {
  NEXT_PUBLIC_S3_ACCESS_KEY,
  NEXT_PUBLIC_S3_BUCKET,
  NEXT_PUBLIC_S3_REGION,
  NEXT_PUBLIC_S3_SECRET_KEY,
  NEXT_PUBLIC_UTHO_CLOUD_ENDPOINT,
} from '@env';
export const s3FileUploader = async (
  file: Blob,
  uploadFileName: string,
): Promise<string> => {
  if (!(file instanceof Blob)) {
    console.error('Invalid file format. Expected Blob or File.');
    throw new Error('Invalid file format.');
  }

  const s3Client = new S3Client({
    region: NEXT_PUBLIC_S3_REGION || 'auto',
    endpoint: NEXT_PUBLIC_UTHO_CLOUD_ENDPOINT,
    credentials: {
      accessKeyId: NEXT_PUBLIC_S3_ACCESS_KEY!,
      secretAccessKey: NEXT_PUBLIC_S3_SECRET_KEY!,
    },
    forcePathStyle: true,
  });

  const fileBuffer = await file.arrayBuffer();
  const key = `uploads/${uploadFileName}`;
  const params = {
    Bucket: NEXT_PUBLIC_S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: file.type || 'application/octet-stream',
  };

  try {
    console.log('Uploading to Utho Cloud...');
    const command = new PutObjectCommand(params) as any;
    await s3Client.send(command);

    const endpoint = NEXT_PUBLIC_UTHO_CLOUD_ENDPOINT;
    const fileUrl = `${endpoint}/${key}`;
    console.log('File uploaded successfully. File URL:', fileUrl);

    // Utho Cloud-specific URL replacement logic
    return fileUrl.replace('/uploads', '/general-bucket/uploads');
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
