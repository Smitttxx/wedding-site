import Stripe from 'stripe';
import prisma from '../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { guestId } = req.body;

  const party = await prisma.guestParty.findUnique({
    where: { id: guestId }
  });

  if (!party) {
    return res.status(404).json({ error: 'Party not found' });
  }

  // 🧼 If no payment required, respond gracefully
  if (!party.accommodationCost) {
    return res.status(200).json({ clientSecret: null, noPayment: true });
  }

  // Calculate total amount (accommodation + booking fee)
  const totalAmount = party.accommodationCost + (party.bookingFee || 0);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: 'gbp',
    metadata: {
      guestId,
      partyName: party.partyName,
    },
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
}
