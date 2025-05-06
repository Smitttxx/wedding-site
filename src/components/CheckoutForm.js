import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Form = styled.form`
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 
    0 4px 12px rgba(191, 161, 78, 0.15),
    0 0 0 1px ${({ theme }) => theme.colors.accent},
    0 0 0 4px ${({ theme }) => theme.colors.lightAccent};
  max-width: 450px;
  margin: 2rem auto;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.base};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.lightAccent});
    border-radius: ${({ theme }) => theme.borderRadius};
    z-index: -1;
    opacity: 0.5;
  }
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(191, 161, 78, 0.1);
`;

const StyledCardElement = styled(CardElement)`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: white;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(191, 161, 78, 0.1);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 
      0 0 0 2px rgba(191, 161, 78, 0.1),
      inset 0 1px 3px rgba(191, 161, 78, 0.1);
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
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(191, 161, 78, 0.2);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.lightError};
    color: ${({ theme }) => theme.colors.error};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: 0.5rem;
  width: 100%;
  font-size: 1rem;
  background: white;
  box-shadow: inset 0 1px 3px rgba(191, 161, 78, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 
      0 0 0 2px rgba(191, 161, 78, 0.1),
      inset 0 1px 3px rgba(191, 161, 78, 0.1);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
  }
`;

export default function CheckoutForm({ partyId, clientSecret, amount, inviteCode }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [postcode, setPostcode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            postal_code: postcode,
          },
        },
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
      <StyledCardElement
        id="card-element"
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '16px',
              color: '#000',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
          },
        }}
      />
      <br/>
      <Label htmlFor="postcode">Billing Postcode:</Label>
      <Input
        id="postcode"
        name="postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder="e.g. PH15 2PG"
        required
      />

      <Button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay £${(amount / 100).toFixed(2)}`}
      </Button>
    </Form>
  );
}
