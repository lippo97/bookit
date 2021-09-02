import express from 'express';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: 'development',
    secretAccessKey: 'development',
  },
  endpoint: 'http://localhost:9000',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

s3.putObject({
  Bucket: 'building-images',
  Key: 'testkey',
  Body: 'Hello man',
})
  .promise()
  .then((res) => {
    console.log(res);
  });
