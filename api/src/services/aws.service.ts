import AWS from 'aws-sdk';
import config from 'config';
import { S3 } from 'aws-sdk';
const awsAccessId = config.get<string>('awsAccessId');
const awsSecretKey = config.get<string>('awsSecretKey');
const awsS3BucketName = config.get<string>('awsS3BucketName');

const s3 = new AWS.S3({
  accessKeyId: awsAccessId,
  secretAccessKey: awsSecretKey,
});

export type S3Body = {};

export function uploadFileToAWSS3(fileName: string, fileType: string, fileContent: S3Body) {
  return new Promise<S3.ManagedUpload.SendData>((resolve, reject) => {
    const params = {
      Bucket: awsS3BucketName,
      Key: fileName,
      ContentType: fileType,
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
