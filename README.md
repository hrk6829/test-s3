# S3操作プログラム

このプログラムは、Node.jsを使用してAWS S3でのオブジェクトのアップロード、ダウンロード、削除を行うための簡単なコンソールアプリです。

## 実行コマンド
```
# node index.js <operation> <bucketName> <objectKey> <filePath>
```

| 引数           | 説明                                                         |
| -------------- | ------------------------------------------------------------ |
| `<operation>`  | アップロード、ダウンロード、削除のいずれかを指定します。     |
| `<bucketName>` | S3バケットの名前。                                           |
| `<objectKey>`  | S3オブジェクトのキーまたは名前。                             |
| `<filePath>`   | アップロード時またはダウンロード時に使用するファイルのパス。 |

## 実行例
```
# node index.js upload test-bucket 1/test.txt test.txt
# node index.js download test-bucket 1/test.txt test.txt
# node index.js delete test-bucket 1/test.txt
```
