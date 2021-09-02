import { S3 } from 'aws-sdk';
import {
  S3_HOST,
  S3_PORT,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
} from './constants';

export const s3 = new S3({
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  endpoint: `${S3_HOST}:${S3_PORT}`,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});
