# Google OAuth Setup Instructions

To enable Google OAuth authentication in ReferralPro, you need to create a Google OAuth application and get the credentials.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)

## Step 2: Create OAuth 2.0 Credentials

1. In the Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application** as the application type
4. Set the following:
   - **Name**: ReferralPro Local Development
   - **Authorized JavaScript origins**: `http://localhost:3001`
   - **Authorized redirect URIs**: `http://localhost:3001/api/auth/callback/google`

## Step 3: Get Your Credentials

1. After creating the OAuth client, you'll get:
   - **Client ID** (looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
   - **Client Secret** (looks like: `GOCSPX-abcdefghijklmnopqrstuvwxyz`)

## Step 4: Update Environment Variables

1. Open `/Users/Matts/Documents/ReferralPro/.env.local`
2. Replace the placeholder values:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-actual-client-id-here"
GOOGLE_CLIENT_SECRET="your-actual-client-secret-here"
```

## Step 5: Test the Authentication

1. Restart your development server: `npm run dev`
2. Go to: http://localhost:3001/auth/signin
3. Click "Continue with Google"
4. Complete the OAuth flow
5. You should be redirected to the dashboard

## Important Notes

- Keep your Client Secret secure and never commit it to version control
- For production, you'll need to update the authorized origins and redirect URIs
- The redirect URI must exactly match what you configure in Google Cloud Console

## Troubleshooting

- **Error 400: redirect_uri_mismatch**: Check that your redirect URI in Google Cloud Console exactly matches `http://localhost:3001/api/auth/callback/google`
- **Error 403: access_blocked**: Make sure the Google+ API is enabled in your project
- **Invalid client**: Double-check your Client ID and Client Secret in `.env.local`
