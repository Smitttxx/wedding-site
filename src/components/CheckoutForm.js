import { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from './Button';
import { Label } from './Label';
import { Input } from './Input';
import { RedInfoBox } from './RedInfoBox';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {SectionHeading} from '@/components/Section';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
      "card card"
      "expiry cvv";
  }
`;

const CardField = styled.div`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: white;

  @media (max-width: 768px) {
    &:nth-child(1) { grid-area: card; }
    &:nth-child(2) { grid-area: expiry; }
    &:nth-child(3) { grid-area: cvv; }
  }
`;

const LoadingMessage = styled.div`
  background: ${({ theme }) => theme.colors.lightAccent};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 1rem 0;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.accent};
`;

export default function CheckoutForm({ partyId, clientSecret, amount, inviteCode }) {
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  const markAsPaid = async () => {
    try {
      await axios.post('/api/invite/markPaid', { partyId, inviteCode });
    } catch (error) {
      console.error('Error marking as paid:', error);
      // If marking as paid fails, we'll retry up to 3 times
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(markAsPaid, 1000 * (retryCount + 1)); // Exponential backoff
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setPaymentError(false);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            address: {
              postal_code: postcode,
            },
          },
        },
      });

      if (result.error) {
        setPaymentError(true);
        console.error('Payment failed:', result.error);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Mark as paid before redirecting
        await markAsPaid();
        window.location.href = `/payment/${inviteCode}?success=true`;
      }
    } catch (error) {
      setPaymentError(true);
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <br/>
        <SectionHeading>
        <label htmlFor="card-element">Card Details:</label>
        </SectionHeading>
        <CardDetailsContainer>
          <CardField>
            <CardNumberElement
              id="card-number"
              options={{
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
          </CardField>
          <CardField>
            <CardExpiryElement
              id="card-expiry"
              options={{
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
          </CardField>
          <CardField>
            <CardCvcElement
              id="card-cvc"
              options={{
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
          </CardField>
        </CardDetailsContainer>
      </div>

      <div>
        <Label htmlFor="postcode">Billing Postcode:</Label>
        <Input
          id="postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g. PH15 2PG"
          required
        />
      </div>

      {loading && (
        <LoadingMessage>
          <p>Please do not refresh the page or close this window while we process your payment.</p>
          <p>If you have been charged, your room is secured and this will update automatically.</p>
          {retryCount > 0 && (
            <p>Attempting to update payment status... (Attempt {retryCount + 1}/3)</p>
          )}
        </LoadingMessage>
      )}

      {paymentError && (
        <RedInfoBox icon={faTimesCircle}>
          Payment failed. Please check your card details and try again.
        </RedInfoBox>
      )}

      <Button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay £${(amount / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      </Button>
    </Form>
  );
}
