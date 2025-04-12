import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { inviteCode } = req.query;

  try {
    const party = await prisma.guestParty.findUnique({
      where: { inviteCode: inviteCode },
      include: {
        guests: true
      }
    });

    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    return res.status(200).json(party);
  } catch (error) {
    console.error('Error fetching party:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
