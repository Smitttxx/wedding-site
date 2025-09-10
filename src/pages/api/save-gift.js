import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, message, giftId, amount, paymentIntentId } = req.body;

    if (!giftId) {
      return res.status(400).json({ message: 'Gift ID is required' });
    }

    // Check if this purchase already exists (idempotency)
    if (paymentIntentId) {
      const existingPurchase = await prisma.giftPurchase.findFirst({
        where: { paymentIntentId }
      });

      if (existingPurchase) {
        return res.status(200).json({ 
          message: 'Gift already saved', 
          purchaseId: existingPurchase.id 
        });
      }
    }

    // Create the purchase record (claimed count already incremented during payment intent creation)
    const result = await prisma.$transaction(async (prisma) => {
      const purchaseId = await generateUniquePurchaseId(prisma);
      // Create the purchase record
      const purchase = await prisma.giftPurchase.create({
        data: {
          id: purchaseId,
          giftId: parseInt(giftId),
          name,
          message: message || null,
          paymentIntentId,
        },
      });

      return purchase;
    });

    res.status(200).json({ message: 'Gift saved successfully', purchaseId: result.id });
  } catch (err) {
    console.error('Error saving gift:', err);
    res.status(500).json({ message: 'Error saving gift' });
  }
} 