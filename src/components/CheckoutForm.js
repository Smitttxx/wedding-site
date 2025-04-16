import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Form = styled.form`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 450px;
  margin: 2rem auto;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.base};
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledCardElement = styled(CardElement)`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: #fff;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.25rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default function CheckoutForm({ partyId, clientSecret, amount, inviteCode }) {
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
      await axios.post('/api/invite/markPaid', { partyId, inviteCode });
      router.replace(`/payment/${inviteCode}?success=true`);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="card-element">Card Details:</Label>
      <StyledCardElement id="card-element" />
      <Button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay £${(amount / 100).toFixed(2)}`}
      </Button>
    </Form>
  );
}
