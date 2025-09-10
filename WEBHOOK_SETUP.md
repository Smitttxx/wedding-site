# Stripe Webhook Setup Instructions

## What I've Fixed

I've identified and fixed several critical issues with your gift payment system:

### Problems Fixed:

1. **No availability checking before payment**: Payments were being processed for sold-out gifts
2. **No Stripe webhooks**: If the client-side database save failed, payments went through but weren't recorded
3. **Minimal Stripe metadata**: Only gift ID was stored, making it impossible to identify purchasers if database saves failed
4. **Race conditions**: Multiple users could create payment intents for the same gift simultaneously (like your 3 solar panel purchases)

### Changes Made:

1. **Enhanced Payment Intent Creation** (`/api/create-gift-payment-intent.js`):
   - **Atomic availability checking**: Uses database transactions to check and reserve gifts simultaneously
   - **Race condition prevention**: Only one person can reserve each available gift slot
   - Added comprehensive metadata including buyer name, message, gift details, and timestamp
   - Returns proper error messages for sold-out gifts

2. **Created Stripe Webhook Handler** (`/api/webhooks/stripe.js`):
   - Handles `payment_intent.succeeded` events
   - Creates database records even if client-side save fails
   - Includes idempotency to prevent duplicate records
   - Logs all gift purchases for debugging

3. **Updated Gift Modal** (`GiftModal.js`):
   - Creates payment intent with form data when submitted (not upfront)
   - Handles sold-out gift errors gracefully
   - Shows better error messages

4. **Enhanced Save Gift API** (`/api/save-gift.js`):
   - Added idempotency to prevent duplicate saves
   - Checks for existing purchases before creating new ones

5. **Improved Gift Section** (`GiftSection.js`):
   - Added client-side availability checking
   - Better error handling and user feedback

## Webhook Setup Required

To complete the fix, you need to set up the Stripe webhook:

### 1. Add Environment Variable
Add this to your `.env.local` file:
```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 2. Create Webhook in Stripe Dashboard
1. Go to your Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen for: `payment_intent.succeeded`
5. Copy the webhook signing secret and add it to your environment variables

### 3. Test the Webhook
You can test the webhook using Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## How It Works Now

### Payment Flows Fixed:

1. **GiftModal** (for specific gifts like solar panels):
   - User clicks gift → Client-side availability check
   - User fills form → Payment intent created with full metadata + atomic reservation
   - Payment succeeds → Two paths ensure database update

2. **CustomGiftForm** (for custom amount gifts):
   - User fills form → Payment intent created with full metadata
   - Payment succeeds → Two paths ensure database update

3. **All Flows**:
   - Client-side: Calls `/api/save-gift`
   - Webhook: Stripe calls `/api/webhooks/stripe`
   - Idempotency: Duplicate saves are prevented
   - Comprehensive logging: All gift purchases are logged with full details

## Benefits

- ✅ No more payments for sold-out gifts
- ✅ Reliable database updates via webhooks
- ✅ Full gift information in Stripe metadata
- ✅ No more embarrassing "unknown gift" situations
- ✅ Race condition protection
- ✅ Better error handling and user feedback

The system is now much more robust and will prevent the issues you experienced with the solar panels gift!
