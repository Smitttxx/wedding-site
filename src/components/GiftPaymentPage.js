import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function PaymentStatusHandler({ gift, amount, isProcessing, setIsProcessing, hasSaved, setHasSaved }) {
  const stripe = useStripe();
  const router = useRouter();

  const { giftId, paymentIntentId } = router.query;

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
    if (clientSecret && stripe && gift && !hasSaved) {
      setIsProcessing(true);
      stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          // Read name/message from localStorage
          const name = localStorage.getItem('giftName') || '';
          const message = localStorage.getItem('giftMessage') || '';
          await axios.post('/api/save-gift', {
            name,
            message,
            giftId: gift.id,
            amount,
            paymentIntentId: paymentIntent.id,
          });
          // Clear from localStorage
          localStorage.removeItem('giftName');
          localStorage.removeItem('giftMessage');
          // Redirect before changing state to avoid flicker
          router.replace(`/gifts/thank-you?giftId=${gift.id}&paymentIntentId=${paymentIntent.id}`);
          // Do not setHasSaved(true) here
        } else {
          setIsProcessing(false);
        }
      });
    }
  }, [stripe, gift, amount, hasSaved, router, setIsProcessing]);
}

export default function GiftPaymentPage({ gift, amount, clientSecret }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const handleSuccess = async (paymentIntentId) => {
    await axios.post('/api/save-gift', {
      name,
      message,
      giftId: gift.id,
      amount,
      paymentIntentId,
    });
    // Clear from localStorage in case it exists
    localStorage.removeItem('giftName');
    localStorage.removeItem('giftMessage');
    router.push(`/gifts/thank-you?giftId=${gift.id}&paymentIntentId=${paymentIntentId}`);
  };

  const appearance = { theme: 'stripe' };
  const options = {clientSecret, appearance};
  
  if (isProcessing && !hasSaved) {
    return (
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <div style={{ fontSize: '1.2em', marginBottom: 12 }}>Processing your payment...</div>
        <div className="spinner" style={{ margin: '0 auto', width: 40, height: 40, border: '4px solid #eee', borderTop: '4px solid #bfa14e', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ margin: '0.5rem 0 0.25rem' }}>{gift.name}</h2>
        <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>{gift.description}</p>
        <div style={{ fontWeight: 'bold', color: '#bfa14e', marginTop: 8 }}>
          Gift Amount: £{(amount / 100).toFixed(2)}
        </div>
      </div>
      <Elements options={options} stripe={stripePromise}>
        <PaymentStatusHandler
          gift={gift}
          amount={amount}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          hasSaved={hasSaved}
          setHasSaved={setHasSaved}
        />
        <CheckoutForm
          amount={amount}
          clientSecret={clientSecret}
          onSuccess={handleSuccess}
          extraFields={{ name, setName, message, setMessage }}
          submitLabel={`Pay £${(amount / 100).toFixed(2)}`}
        />
      </Elements>
    </div>
  );
} 