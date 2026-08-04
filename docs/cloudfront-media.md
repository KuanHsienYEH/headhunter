# CloudFront 公開圖片設定

這個設定只讓 CloudFront 讀取 production 的獎項、Banner 與公開聲明圖片。請勿把整個 S3 Bucket 開放給 CloudFront，因為同一個 Bucket 可能包含履歷等私密檔案。

## 1. 建立 Distribution

在 AWS Console 開啟 CloudFront，選擇 **Create distribution**：

- Origin type：Amazon S3
- Origin：選擇 `S3_BUCKET_NAME` 對應的 Bucket（不是 Website endpoint）
- Origin path：留空
- Origin access：Origin access control settings (OAC)
- Signing behavior：Sign requests (recommended)
- Viewer protocol policy：Redirect HTTP to HTTPS
- Allowed methods：GET, HEAD
- Cache policy：CachingOptimized
- WAF：此圖片用途可先不啟用

建立完成後記下 Distribution ID 與網域，例如 `dxxxxxxxxxxxxx.cloudfront.net`。

## 2. 限制 Bucket policy

把下列 statement 加入 S3 Bucket policy，替換三個 placeholder。`S3_PREFIX` 在 production 通常是 `prod`。

```json
{
  "Sid": "AllowCloudFrontReadProductionAwards",
  "Effect": "Allow",
  "Principal": {
    "Service": "cloudfront.amazonaws.com"
  },
  "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET/S3_PREFIX/awards/*",
        "arn:aws:s3:::YOUR_BUCKET/S3_PREFIX/banners/*",
        "arn:aws:s3:::YOUR_BUCKET/S3_PREFIX/announcements/*"
      ],
  "Condition": {
    "StringEquals": {
      "AWS:SourceArn": "arn:aws:cloudfront::YOUR_AWS_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  }
}
```

保留 **Block all public access**。OAC 會代表 CloudFront 存取私有物件，不需要把 Bucket 或物件設為 public。

## 3. 設定 production 環境變數

在部署平台的 Production environment 加入：

```dotenv
MEDIA_CDN_URL=https://dxxxxxxxxxxxxx.cloudfront.net
```

重新部署後，前台獎項網址會變成：

```text
https://dxxxxxxxxxxxxx.cloudfront.net/prod/awards/檔名.webp
```

若沒有設定 `MEDIA_CDN_URL`，獎項會自動使用站內快取代理，其他媒體則沿用原本的簽名網址。

## 4. 驗證

部署完成後檢查：

```bash
curl -I https://dxxxxxxxxxxxxx.cloudfront.net/prod/awards/實際檔名.webp
```

第一次通常會看到 `X-Cache: Miss from cloudfront`，重複請求後應看到 `X-Cache: Hit from cloudfront`。直接開啟 S3 object URL 應維持 `AccessDenied`。
