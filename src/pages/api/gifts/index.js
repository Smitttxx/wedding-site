// /pages/api/gifts/index.ts
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const gifts = await prisma.gift.findMany({ orderBy: { section: 'asc' } });
      return res.status(200).json(gifts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch gifts' });
    }
  }

  if (req.method === 'POST') {
    const { section, name, amount, from, message } = req.body;

    if (!section || !name || !from || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const gift = await prisma.gift.create({
        data: {
          section,
          name,
          amount,
          from,
          message,
        },
      });

      return res.status(201).json(gift);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to create gift' });
    }
  }

  // If method is not GET or POST
  return res.status(405).json({ message: 'Method not allowed' });
}
