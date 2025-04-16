import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { partyId, inviteCode } = req.body;
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  const bookingReference = `${inviteCode}${randomDigits}`;

  try {
    const party = await prisma.guestParty.update({
      where: { id: partyId },
      data: { paid: true, bookingReference: bookingReference},
    });

    res.status(200).json(party);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark as paid' });
  }
}
