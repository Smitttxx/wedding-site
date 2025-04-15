// File: components/CheckoutForm.js
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useRouter} from 'next/router';

const Form = styled.form`
  padding: 1rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  color: black;
  margin: auto;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #5c7cfa;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledCardElement = styled(CardElement)`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #f8f9fa;
  margin-top: 0.5rem;
  color: black;  
`;

export default function CheckoutForm({partyId, clientSecret, amount, inviteCode}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      router.replace(`/payment/${inviteCode}?error=true`);
    } else if (result.paymentIntent.status === 'succeeded') {
      await axios.post('/api/invite/markPaid', {partyId});
      router.replace(`/payment/${inviteCode}?success=true`);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="card-element">Card Details:</label>
      <StyledCardElement id="card-element" />
      <Button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay £${(amount / 100).toFixed(2)}`}
      </Button>
    </Form>
  );
}
