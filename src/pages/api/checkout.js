import Stripe from 'stripe';
import prisma from '../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { guestId } = req.body;

  const guest = await prisma.guest.findUnique({ where: { id: guestId } });

  if (!guest) return res.status(404).json({ error: 'Guest not found' });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: {
          name: `Room Payment – ${guest.name}`,
        },
        unit_amount: 10000, // £100.00 in pence
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/guest/${guest.token}?success=true`,
    cancel_url: `${req.headers.origin}/guest/${guest.token}?canceled=true`,
    metadata: {
      guestId: guest.id,
    },
  });

  res.status(200).json({ url: session.url });
}
