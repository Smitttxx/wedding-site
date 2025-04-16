import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const existing = await prisma.gift.findUnique({ where: { id: Number(id) } });
      if (!existing) return res.status(404).json({ message: 'Gift not found' });

      const newClaimed = (existing.claimed || 0) + 1;
      const isNowFull = existing.quantity ? newClaimed >= existing.quantity : false;

      const updated = await prisma.gift.update({
        where: { id: Number(id) },
        data: {
          claimed: newClaimed,
          available: !isNowFull,
          from: req.body.from || existing.from,
          message: req.body.message || existing.message,
        }
      });

      return res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating gift' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}