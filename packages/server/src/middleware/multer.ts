import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import multers3 from 'multer-s3';
import { s3 } from '../config/s3';

/* const accountImagesBucketName = 'account-images';
export const accountImagesUpload = multer({
  storage: multers3({
    s3,
    bucket: accountImagesBucketName,
    contentType: multers3.AUTO_CONTENT_TYPE,
    cacheControl: 'max-age=31536000',
    key(req: any, file: any, cb: any) {
      const extension = file.originalname.split('.').slice(-1);
      cb(null, `${uuidv4()}.${extension}`);
    },
  }),
}); */

const libraryImagesBucketName = 'library-images';

export const libraryImageUpload = multer({
  storage: multers3({
    s3,
    bucket: libraryImagesBucketName,
    contentType: multers3.AUTO_CONTENT_TYPE,
    cacheControl: 'max-age=31536000',
    key(_: any, file: any, cb: (error: any, bucket?: string) => void) {
      const extension = file.originalname.split('.').slice(-1);
      cb(null, `${uuidv4()}.${extension}`);
    },
  }),
});

/* function libraryImageS3Getter(imageFileName: string) {
  return s3
    .getObject({
      Bucket: libraryImagesBucketName,
      Key: imageFileName,
    })
    .promise();
}

export async function libraryImageGetter(
  imageFileName: string,
): Promise<Blob | undefined> {
  const { data } = (await libraryImageS3Getter(imageFileName)).$response;
  if (data && data.Body) {
    return data.Body as Blob;
  }
  return undefined;
}
*/
