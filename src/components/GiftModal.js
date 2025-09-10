import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import {Label} from "./Label";
import {Input} from "./Input";
import {Textarea} from "./TextArea";
import {Button} from "./Button";
import {StyledCardElement} from "./CardElement";
import {RedInfoBox} from "./RedInfoBox";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 2000;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  margin: 4rem 0;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
`;

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

export default function GiftModal({ isOpen, onClose, gift, amount }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setPaymentError(false);

    try {
      // Create a new payment intent with the current form data
      const paymentIntentResponse = await axios.post('/api/create-gift-payment-intent', {
        amount: gift.amount,
        giftId: gift.id,
        name,
        message,
      });

      const result = await stripe.confirmCardPayment(paymentIntentResponse.data.clientSecret, {
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
        setPaymentSuccess(true);
        const saveRes = await axios.post('/api/save-gift', {
          name,
          message,
          giftId: gift.id,
          amount,
          paymentIntentId: result.paymentIntent.id,
        });
        onClose();
        router.push(`/gifts/thank-you?purchaseId=${saveRes.data.purchaseId}`);
      }
    } catch (error) {
      setPaymentError(true);
      console.error('Error processing payment:', error);
      if (error.response?.data?.error === 'GIFT_SOLD_OUT') {
        alert('Sorry, this gift is no longer available. Please refresh the page to see updated availability.');
        onClose();
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ margin: '0.5rem 0 0.25rem' }}>{gift.name}</h2>
          <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>{gift.description}</p>
          <div style={{ fontWeight: 'bold', color: '#bfa14e', marginTop: 8 }}>
            Gift Amount: £{(amount / 100).toFixed(2)}
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Your Name:</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message to the Bride and Groom:</Label>
            <Textarea
              required
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="card-element">Card Details:</Label>
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
              <p>If you have been charged, your gift has been received and this will update automatically.</p>
            </LoadingMessage>
          )}

          {paymentError && (
            <RedInfoBox icon={faTimesCircle}>
              Oops, something went wrong. Would you like to try again?
            </RedInfoBox>
          )}

          <Button type="submit" disabled={!stripe || loading || paymentSuccess}>
            {loading ? 'Processing...' : `Gift £${(amount / 100).toFixed(2)}`}
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
} 