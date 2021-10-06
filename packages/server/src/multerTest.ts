import { s3 } from './config/s3';

const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'library-images',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    cacheControl: 'max-age=31536000',
    key(req: Request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});

app.post('/upload', upload.array('photos', 3), (req, res, next) => {
  res.send(`Successfully uploaded ${req.files.length}files!`);
});

app.listen(3000, () => {
  console.log('running on 3000');
});

// s3.putObject({
//   Bucket: 'library-images',
//   Key: 'testkey',
//   Body: 'Hello man',
// })
//   .promise()
//   .then((res) => {
//     console.log(res);
//   });
