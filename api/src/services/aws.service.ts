import AWS from 'aws-sdk';
import config from 'config';
import { S3 } from 'aws-sdk';
import { S3Body, S3UploadResult, SizeName } from '../types';
import { nanoid } from 'nanoid';

const awsRegion = config.get<string>('awsRegion');
const awsAccessId = config.get<string>('awsAccessId');
const awsSecretKey = config.get<string>('awsSecretKey');
const awsS3BucketName = config.get<string>('awsS3BucketName');

const s3 = new AWS.S3({
  region: awsRegion,
  accessKeyId: awsAccessId,
  secretAccessKey: awsSecretKey,
  signatureVersion: 'v4',
  // apiVersion: '2006-03-01',
});

export async function generateUploadURL(contentType: string) {
  const imageName = nanoid(16);

  const params = {
    Bucket: awsS3BucketName,
    Key: imageName,
    Expires: 60 * 60,
    ContentType: contentType,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}

export function uploadFileToAWSS3(fileName: string, contentType: string, fileContent: S3Body) {
  return new Promise<S3UploadResult>((resolve, reject) => {
    const params = {
      Bucket: awsS3BucketName,
      Key: fileName,
      ContentType: contentType,
      Body: fileContent,
      ACL: 'public-read',
    };

    s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function deleteFileFromAWSS3(originalUrl: string) {
  return new Promise<boolean>((resolve, reject) => {
    const objectKey = `${awsS3BucketName}/` + originalUrl.substring(originalUrl.lastIndexOf('/') + 1);
    const params = {
      Bucket: awsS3BucketName,
      Key: objectKey,
    };
    s3.deleteObject(params, (err: Error) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
