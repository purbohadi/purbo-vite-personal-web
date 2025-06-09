# Cloudflare R2 & Slack Setup Guide

This guide will help you set up Cloudflare R2 storage and Slack notifications for the unit test reporting workflow.

## 🔧 Cloudflare R2 Setup

### 1. Create Cloudflare R2 Bucket

1. **Login to Cloudflare Dashboard**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **R2 Object Storage**

2. **Create a New Bucket**
   - Click **"Create bucket"**
   - Enter a bucket name (e.g., `your-project-reports`)
   - Choose a location (optional)
   - Click **"Create bucket"**

### 2. Generate R2 API Token

1. **Navigate to API Tokens**
   - Go to **My Profile** → **API Tokens**
   - Click **"Create Token"**

2. **Create Custom Token**
   - Click **"Custom token"**
   - **Token name**: `GitHub-Reports`
   - **Permissions**:
     - Account: `Cloudflare R2:Edit`
   - **Account Resources**: Include your account
   - **Zone Resources**: (leave as default)
   - Click **"Continue to summary"**
   - Click **"Create Token"**

3. **Save Credentials**
   - Copy the **API Token** (this will be your `CLOUDFLARE_R2_SECRET_ACCESS_KEY`)
   - Your **Account ID** can be found in the right sidebar of your Cloudflare dashboard

### 3. Get Required Information

You'll need to collect these values:

- **Account ID**: Found in Cloudflare dashboard sidebar
- **Bucket Name**: The name you chose for your bucket
- **Access Key ID**: This is your **Account ID**
- **Secret Access Key**: The **API Token** you just created
- **Endpoint URL**: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`

## 📱 Slack Setup

### 1. Create/Find Your Slack Channel

1. **Create a New Channel** (or use existing)
   - In Slack, click the **"+"** next to "Channels"
   - Name it something like `#unit-test-reports`
   - Make it public or private as needed

2. **Get Channel ID**
   - Right-click on the channel name
   - Select **"Copy link"**
   - The URL will look like: `https://yourworkspace.slack.com/archives/C1234567890`
   - The Channel ID is the part after `/archives/` (e.g., `C1234567890`)

### 2. Slack Bot Token

**Option A: Use Existing Bot Token**
- If you already have a Slack bot token that works in your workspace, you can reuse it

**Option B: Create New Slack App**
1. Go to [Slack API](https://api.slack.com/apps)
2. Click **"Create New App"** → **"From scratch"**
3. Enter app name (e.g., "Unit Test Reporter R2")
4. Select your workspace
5. Go to **"OAuth & Permissions"**
6. Add these Bot Token Scopes:
   - `chat:write`
   - `chat:write.public`
7. Click **"Install to Workspace"**
8. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

## 🔐 GitHub Secrets Configuration

Add these secrets to your GitHub repository:

### Repository Settings → Secrets and variables → Actions

**Cloudflare Secrets:**
```
CLOUDFLARE_ACCESS_KEY_ID = <Your Account ID>
CLOUDFLARE_SECRET_ACCESS_KEY = <Your R2 API Token>
CLOUDFLARE_BUCKET_NAME = <Your Bucket Name>
CLOUDFLARE_ENDPOINT_URL = https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

**Slack Secrets:**
```
SLACK_BOT_TOKEN = <Your Slack Bot Token>
SLACK_CHANNEL_ID = <Your Channel ID>
```

## 🧪 Testing the Setup

### 1. Manual Trigger Test

You can test the workflow by creating a tag:

```bash
git tag generate-unit-test-report-test-$(date +%s)
git push origin --tags
```

### 2. Verify R2 Upload

1. Go to your Cloudflare R2 bucket
2. Check for files under the `unit-test-reports/` folder
3. Files should be named with timestamp format: `YYYY-MM-DDTHH:MM:SS`

### 3. Verify Slack Notification

1. Check your designated Slack channel
2. You should see a message with test coverage details
3. The message should include emojis and a button to view the workflow

## 📋 Troubleshooting

### Common Issues:

**R2 Upload Fails:**
- Check that your Account ID is correct
- Verify the API token has R2 edit permissions
- Ensure the bucket name matches exactly
- Check that the endpoint URL includes your Account ID

**Slack Notification Fails:**
- Verify the bot token starts with `xoxb-`
- Check that the channel ID is correct (starts with `C`)
- Ensure the bot is added to the channel
- Verify bot has necessary permissions (`chat:write`)

**Workflow Doesn't Trigger:**
- Check the tag format: `generate-unit-test-report-*`
- Verify the cron schedule: `0 2 * * *` (2 AM daily)
- Check GitHub Actions are enabled for your repository

### Debugging Commands:

**Test R2 Connection Locally:**
```bash
# Install AWS CLI
aws configure set aws_access_key_id YOUR_ACCOUNT_ID
aws configure set aws_secret_access_key YOUR_R2_API_TOKEN
aws configure set region auto

# Test upload
echo "test" > test.txt
aws s3 cp test.txt s3://YOUR_BUCKET_NAME/test.txt --endpoint-url https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
```

**Test Slack API:**
```bash
curl -X POST -H 'Authorization: Bearer YOUR_BOT_TOKEN' \
-H 'Content-type: application/json' \
--data '{"channel":"YOUR_CHANNEL_ID","text":"Test message"}' \
https://slack.com/api/chat.postMessage
```

## 🔄 Workflow Features

### Differences from Original:

1. **Storage**: Uses Cloudflare R2 instead of Google Cloud Storage
2. **Schedule**: Runs at 2 AM instead of midnight to avoid conflicts
3. **Slack**: Uses separate bot token and channel for R2 reports
4. **Tagging**: Uses `generate-unit-test-r2-report-*` instead of `generate-unit-test-report-*`
5. **Emoji**: Uses `:test_tube:` and `:white_check_mark:` for better visibility

### File Structure in R2:
```
your-bucket/
└── unit-test-reports/
    ├── 2024-01-15T02:00:01/
    │   └── report.json
    ├── 2024-01-16T02:00:01/
    │   └── report.json
    └── ...
```

This setup provides redundancy and separation between your GCS and R2 reporting systems! 