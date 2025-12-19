# Deploying to AWS S3

This guide explains how to deploy the React version of "The Tech Philosophers" website to AWS S3.

## Prerequisites
- AWS CLI installed and configured
- An S3 bucket created and configured for static website hosting
- CloudFront distribution (optional, but recommended for HTTPS)

## 1. Build the Project
Run the build command to generate the static files:
```bash
npm run build
```
This will create an `out` directory containing:
- `index.html`
- `blog.html`
- `blog/`
- `_next/` (static assets)
- `images/`

## 2. Deploy to S3
Use the AWS CLI to sync the `out` directory to your S3 bucket:

```bash
aws s3 sync out/ s3://YOUR_BUCKET_NAME --delete
```

Replace `YOUR_BUCKET_NAME` with your actual bucket name.

## 3. Invalidate CloudFront (if using)
If you are using CloudFront, invalidate the cache to see changes immediately:

```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Troubleshooting
- **404 Errors**: Ensure your S3 bucket has `index.html` set as both the Index and Error document, or configure CloudFront to handle 404s by serving `index.html` (if using client-side routing, though this site uses static export so real 404s are handled by `404.html` if customized).
- **Styles missing**: Ensure `_next` folder is uploaded and accessible.
