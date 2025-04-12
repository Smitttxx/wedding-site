// File: pages/api/guest/update.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { partyId, guests, fridayParty, needsBus } = req.body;

  if (!partyId || !Array.isArray(guests)) {
    return res.status(400).json({ error: 'Missing or invalid data' });
  }

  try {
    // Update the party-level info
    await prisma.guestParty.update({
      where: { id: partyId },
      data: {
        fridayParty,
        needsBus
      }
    });

    // Update each guest individually
    const updates = guests.map(guest => {
      return prisma.individualGuest.update({
        where: { id: guest.id },
        data: {
          dietary: guest.dietary || null,
          rsvp: guest.rsvp || null
        }
      });
    });

    await Promise.all(updates);

    return res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error updating guests:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
