const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { readFileSync, writeFileSync } = require('fs');

const s3Client = new S3Client({
  region: '',
  endpoint: '',
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
});

// S3にオブジェクトをアップロードする関数
const uploadObject = async (bucketName, objectKey, filePath) => {
  const fileContent = readFileSync(filePath);

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: fileContent,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(`オブジェクトを正常にアップロードしました: ${bucketName}/${objectKey}`);
  } catch (error) {
    console.error('オブジェクトのアップロードエラー:', error);
  }
};

// S3からオブジェクトをダウンロードする関数
const downloadObject = async (bucketName, objectKey, destinationPath) => {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const command = new GetObjectCommand(params);
    const s3Object = await s3Client.send(command);
    const byteArray = await s3Object.Body?.transformToByteArray();
    writeFileSync(destinationPath, byteArray);
    console.log(`オブジェクトを正常にダウンロードしました: ${destinationPath}`);
  } catch (error) {
    console.error('オブジェクトのダウンロードエラー:', error);
  }
};

// S3からオブジェクトを削除する関数
const deleteObject = async (bucketName, objectKey) => {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    console.log(`オブジェクトを正常に削除しました: ${bucketName}/${objectKey}`);
  } catch (error) {
    console.error('オブジェクトの削除エラー:', error);
  }
};

// メイン関数
const main = async () => {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('使用法: node index.js <operation> <bucketName> <objectKey> <filePath>');
    return;
  }

  const operation = args[0];
  const bucketName = args[1];
  const objectKey = args[2];
  const filePath = args[3];

  switch (operation) {
    case 'upload':
      await uploadObject(bucketName, objectKey, filePath);
      break;
    case 'download':
      await downloadObject(bucketName, objectKey, filePath);
      break;
    case 'delete':
      await deleteObject(bucketName, objectKey);
      break;
    default:
      console.log('無効な操作です。サポートされている操作: upload, download, delete');
  }
};

main();
