# 🚀 CoinGecko API Key Setup

## Quick Setup Instructions

1. **Get your FREE CoinGecko API key:**

   - Visit: https://www.coingecko.com/en/api/pricing
   - Click "Get Free Demo API Key"
   - Sign up with your email
   - Copy your API key from the dashboard

2. **Add your API key to the project:**

   - Open the `.env.local` file in the root directory
   - Find this line: `# NEXT_PUBLIC_COINGECKO_API_KEY=YOUR_API_KEY_HERE`
   - Remove the `#` and replace `YOUR_API_KEY_HERE` with your actual API key
   - Example: `NEXT_PUBLIC_COINGECKO_API_KEY=CG-abc123def456...`

3. **Restart your development server:**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

## Benefits of Using Your API Key

✅ **Higher Rate Limits**: 50 calls/minute (vs 5-10 without key)
✅ **Better Reliability**: Priority access, fewer timeouts
✅ **Stable Performance**: Consistent response times
✅ **Free Tier**: 10,000 calls per month at no cost

## What's Been Improved

- ✅ Centralized API configuration with automatic key injection
- ✅ Better error handling and timeout management
- ✅ Consistent API calls across all components
- ✅ Improved search functionality in portfolio and navigation
- ✅ Better asset data fetching with retry mechanisms

## Components Updated

- Portfolio asset fetching (`AssetRow.tsx`)
- Coin search functionality (`SelectCoin.tsx`, `Search.tsx`)
- Asset addition in portfolio (`FormModal.tsx`)
- Market data fetching

The app will work without an API key, but you'll experience much better performance and fewer timeouts with one!
