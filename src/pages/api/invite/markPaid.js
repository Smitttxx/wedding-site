import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { partyId } = req.body;

  try {
    const party = await prisma.guestParty.update({
      where: { id: partyId },
      data: { paid: true },
    });

    res.status(200).json(party);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark as paid' });
  }
}
