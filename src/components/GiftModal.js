import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
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

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  width: 100%;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  width: 100%;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const StyledCardElement = styled(CardElement)`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  background-color: #fff;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.25rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default function GiftModal({ isOpen, onClose, gift, amount, clientSecret }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
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
        console.error('Payment failed:', result.error);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Save the gift details
        await axios.post('/api/save-gift', {
          name,
          message,
          giftId: gift.id,
          amount,
          paymentIntentId: result.paymentIntent.id,
        });
        onClose();
        router.push('/gifts/thank-you');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
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
            <Label htmlFor="message">Message (optional):</Label>
            <TextArea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div>
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

          <Button type="submit" disabled={!stripe || loading}>
            {loading ? 'Processing...' : `Gift £${(amount / 100).toFixed(2)}`}
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
} 