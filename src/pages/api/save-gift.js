import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, message, giftId, amount, paymentIntentId } = req.body;

    if (!giftId) {
      return res.status(400).json({ message: 'Gift ID is required' });
    }

    // Create the purchase and update the claimed count in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create the purchase record
      const purchase = await prisma.giftPurchase.create({
        data: {
          giftId: parseInt(giftId),
          name,
          message: message || null,
          paymentIntentId,
        },
      });

      // Update the claimed count on the gift
      await prisma.gift.update({
        where: { id: parseInt(giftId) },
        data: {
          claimed: {
            increment: 1
          }
        }
      });

      return purchase;
    });

    res.status(200).json({ message: 'Gift saved successfully' });
  } catch (err) {
    console.error('Error saving gift:', err);
    res.status(500).json({ message: 'Error saving gift' });
  }
} 