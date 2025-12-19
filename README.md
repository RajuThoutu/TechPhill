# Tech Philosophers - AWS Deployment Guide

This guide outlines how to host your static website on AWS using S3 (storage) and CloudFront (CDN/SSL).

## Prerequisites
- An AWS Account
- A domain name (optional but recommended)

## Step 1: Create an S3 Bucket
1. Go to the **S3 Console**.
2. Click **Create bucket**.
3. Name your bucket (e.g., `tech-philosophers-site`).
4. Uncheck **Block all public access** (we will secure it via bucket policy later, or keep it private if using CloudFront OAI/OAC - recommended).
5. Enable **Static website hosting** in the bucket properties if you want to test directly from S3 (optional).

## Step 2: Upload Files
1. Upload all files from the `tech-philosophers` directory to the root of your bucket.
   - `index.html`
   - `styles.css`
   - `script.js`
   - `blog/` folder

## Step 3: Configure CloudFront (Recommended for SSL & Speed)
1. Go to the **CloudFront Console**.
2. Click **Create Distribution**.
3. **Origin Domain**: Select your S3 bucket.
4. **Origin Access**: Choose **Origin access control settings (recommended)**. Create a new control setting.
   - *Note: You will need to update your S3 bucket policy to allow CloudFront access. CloudFront provides this policy after creation.*
5. **Viewer Protocol Policy**: Redirect HTTP to HTTPS.
6. **Default Root Object**: `index.html`.
7. **Create Distribution**.

## Step 4: Update S3 Bucket Policy
Copy the policy provided by CloudFront and paste it into your S3 Bucket Permissions > Bucket Policy.

## Step 5: Domain Name (Route 53)
If you have a domain:
1. Go to **Route 53**.
2. Create an **A Record**.
3. Toggle **Alias** to Yes.
4. Select your CloudFront distribution.

## Local Testing
To test locally before deploying, simply open `index.html` in your browser.
