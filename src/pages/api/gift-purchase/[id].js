import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const purchase = await prisma.giftPurchase.findUnique({
      where: { id },
      include: { gift: true }
    });
    if (!purchase) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(purchase);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching purchase' });
  }
} 