import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, description, amount, section } = req.body;

    // Create the custom gift
    const gift = await prisma.gift.create({
      data: {
        name,
        description,
        amount,
        section,
        quantity: 1, // Custom gifts are one-off
        claimed: 0,
      },
    });

    res.status(200).json(gift);
  } catch (err) {
    console.error('Error creating custom gift:', err);
    res.status(500).json({ message: 'Error creating custom gift' });
  }
} 