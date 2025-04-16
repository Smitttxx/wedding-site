import prisma from '../../../lib/prisma';

async function updateAccommodation({ partyId, guestType, needsBus
}) {
  return prisma.GuestParty.update({
    where: { id: partyId },
    data: {
		guestType,
		needsBus
    },
  });
}

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();
  
	const { partyId, guestType, needsBus } = req.body;
  
	if (!partyId) {
	  return res.status(400).json({ message: 'Missing required fields' });
	}
  
	try {
	  await updateAccommodation({
		partyId,
		guestType,
		needsBus
	  });
  
	  return res.status(200).json({ success: true });
	} catch (err) {
	  console.error('[accommodation/update] error:', err);
	  return res.status(500).json({ message: 'Internal Server Error' });
	}
  }
  