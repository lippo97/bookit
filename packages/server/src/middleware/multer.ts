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
export const libraryImagesUpload = multer({
  storage: multers3({
    s3,
    bucket: libraryImagesBucketName,
    contentType: multers3.AUTO_CONTENT_TYPE,
    cacheControl: 'max-age=31536000',
    key(
      _: Express.Request,
      file: Express.Multer.File,
      cb: (error: any, bucket?: string) => void,
    ) {
      const extension = file.originalname.split('.').slice(-1);
      cb(null, `${uuidv4()}.${extension}`);
    },
  }),
});
