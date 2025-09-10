import Stripe from 'stripe';
import prisma from '../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, giftId, name, message } = req.body;

    let giftData = null;

    // Handle custom gifts differently (no availability checking needed)
    if (giftId === 'custom') {
      giftData = {
        name: 'Custom Gift',
        description: message || 'Custom gift from donor',
        section: 'GeneralGifts'
      };
    } else {
      // Atomically check availability and increment claimed count for regular gifts
      const result = await prisma.$transaction(async (prisma) => {
        // First, get the current gift with a lock
        const gift = await prisma.gift.findUnique({
          where: { id: parseInt(giftId) }
        });

        if (!gift) {
          throw new Error('Gift not found');
        }

        // Check availability for gifts with quantity limits
        if (gift.quantity && gift.claimed >= gift.quantity) {
          throw new Error('GIFT_SOLD_OUT');
        }

        // Atomically increment the claimed count to reserve this gift
        const updatedGift = await prisma.gift.update({
          where: { id: parseInt(giftId) },
          data: {
            claimed: {
              increment: 1
            }
          }
        });

        return updatedGift;
      });
      giftData = result;
    }

    // Create a PaymentIntent with comprehensive metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'gbp',
      metadata: {
        giftId: giftId.toString(),
        giftName: giftData.name,
        giftDescription: giftData.description,
        giftSection: giftData.section,
        buyerName: name || 'Anonymous',
        buyerMessage: message || '',
        giftAmount: amount.toString(),
        timestamp: new Date().toISOString(),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    
    if (err.message === 'Gift not found') {
      return res.status(404).json({ message: 'Gift not found' });
    }
    
    if (err.message === 'GIFT_SOLD_OUT') {
      return res.status(400).json({ 
        message: 'This gift is no longer available',
        error: 'GIFT_SOLD_OUT'
      });
    }
    
    res.status(500).json({ message: 'Error creating payment intent' });
  }
} 