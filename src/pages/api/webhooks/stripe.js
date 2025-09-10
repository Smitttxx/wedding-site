import Stripe from 'stripe';
import prisma from '../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Get the raw body from the request
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    await new Promise((resolve) => {
      req.on('end', resolve);
    });

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentIntentSucceeded(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    const { metadata } = paymentIntent;
    
    // Only process gift payments (they have giftId in metadata)
    if (!metadata.giftId) {
      console.log('Skipping non-gift payment:', paymentIntent.id);
      return;
    }

    // Check if this purchase already exists
    const existingPurchase = await prisma.giftPurchase.findFirst({
      where: { paymentIntentId: paymentIntent.id }
    });

    if (existingPurchase) {
      console.log('Purchase already exists for payment intent:', paymentIntent.id);
      return;
    }

    // Handle custom gifts differently
    if (metadata.giftId === 'custom') {
      await handleCustomGift(paymentIntent, metadata);
    } else {
      await handleRegularGift(paymentIntent, metadata);
    }

    console.log('Successfully processed gift purchase via webhook:', {
      paymentIntentId: paymentIntent.id,
      giftId: metadata.giftId,
      buyerName: metadata.buyerName
    });

  } catch (error) {
    console.error('Error processing payment intent webhook:', error);
    // Don't throw - we don't want to retry the webhook
  }
}

async function handleCustomGift(paymentIntent, metadata) {
  await prisma.$transaction(async (prisma) => {
    // First create the custom gift
    const customGift = await prisma.gift.create({
      data: {
        name: 'Custom Gift',
        description: metadata.giftDescription || 'Custom gift from donor',
        amount: parseInt(metadata.giftAmount),
        section: 'GeneralGifts',
        quantity: null, // Custom gifts have no quantity limit
        claimed: 0,
      },
    });

    // Then create the purchase record
    const purchaseId = await generateUniquePurchaseId(prisma);
    await prisma.giftPurchase.create({
      data: {
        id: purchaseId,
        giftId: customGift.id,
        name: metadata.buyerName || 'Anonymous',
        message: metadata.buyerMessage || null,
        paymentIntentId: paymentIntent.id,
      },
    });
  });
}

async function handleRegularGift(paymentIntent, metadata) {
  const giftId = parseInt(metadata.giftId);
  
  await prisma.$transaction(async (prisma) => {
    // Generate unique purchase ID
    const purchaseId = await generateUniquePurchaseId(prisma);
    
    // Create the purchase record (claimed count already incremented during payment intent creation)
    await prisma.giftPurchase.create({
      data: {
        id: purchaseId,
        giftId: giftId,
        name: metadata.buyerName || 'Anonymous',
        message: metadata.buyerMessage || null,
        paymentIntentId: paymentIntent.id,
      },
    });
  });
}

function randomId(length = 4) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function generateUniquePurchaseId(prisma) {
  let id;
  let exists = true;
  while (exists) {
    id = randomId();
    exists = await prisma.giftPurchase.findUnique({ where: { id } });
  }
  return id;
}

// Disable body parsing for webhooks
export const config = {
  api: {
    bodyParser: false,
  },
}
