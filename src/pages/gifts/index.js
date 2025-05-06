import styled from 'styled-components';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import {Page} from '@/components/Page';
import {SectionHeading} from '@/components/Section';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import GiftModal from '../../components/GiftModal';

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin: 1.5rem 0;
  text-align: center;
`;

const GiftCardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;

const GiftCard = styled.div`
  background: white;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  width: 250px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const GiftImage = styled(Image)`
  border-radius: 8px;
`;

const GiftTitle = styled.h4`
  margin: 0.75rem 0 0.5rem;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
`;

const GiftDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text};
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h3`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
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

const gifts = [
  {
    id: 'cruise',
    title: 'Cruise Memories',
    image: '/cruise.webp',
    description: 'Help us make waves on our honeymoon cruise — from cocktails at sunset to late-night dance floors.',
    section: 'TheCruise',
  },
  {
    id: 'garden',
    title: 'Sully\'s Garden',
    image: '/garden.jpg',
    description: 'Our current garden needs a lot of work for it to be safe for Sully. Help us create a magical little garden — a space for running wild, growing veggies, and making mud pies.',
    section: 'SullysGarden',
  },
  {
    id: 'general',
    title: 'Other Gifts',
    image: '/house.jpeg',
    description: 'Other gifts',
    section: 'GeneralGifts',
  },
];

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CustomGiftForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    amount: ''
  });
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      // Create payment intent
      const response = await axios.post('/api/create-gift-payment-intent', {
        amount: parseFloat(formData.amount) * 100,
        giftId: 'custom'
      });

      const result = await stripe.confirmCardPayment(response.data.clientSecret, {
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
        // First create the custom gift
        const giftResponse = await axios.post('/api/create-custom-gift', {
          name: 'Custom Gift',
          description: formData.message,
          amount: parseFloat(formData.amount) * 100,
          section: 'GeneralGifts'
        });

        // Then save the purchase with the new gift ID
        await axios.post('/api/save-gift', {
          name: formData.name,
          message: formData.message,
          giftId: giftResponse.data.id,
          amount: parseFloat(formData.amount) * 100,
          paymentIntentId: result.paymentIntent.id,
        });
        router.push('/gifts/thank-you');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Make a Custom Gift</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextArea
          name="message"
          placeholder="What would you like us to use this gift for?"
          value={formData.message}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="amount"
          placeholder="Amount (£)"
          value={formData.amount}
          onChange={handleInputChange}
          min="1"
          step="0.01"
          required
        />
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
        <SubmitButton type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : `Gift £${formData.amount || '0.00'}`}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}

export default function GiftsPage() {
  const [selectedGift, setSelectedGift] = useState(null);

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>Gifts</SectionHeading>
          <Paragraph>
            {"Your presence means the world to us — we're truly grateful you're joining us for our big weekend."}
          </Paragraph>
          <Paragraph>
            We are lucky to already have a home (and our dream kitchen!), so instead of traditional gifts, we would love for you to help us create memories. If you feel moved to gift something, we have created a few options below.
          </Paragraph>
          <GiftCardGrid>
            {gifts.map((gift) => (
              <GiftCard key={gift.id}>
                <GiftTitle>{gift.title}</GiftTitle>
                <GiftImage src={gift.image} width={220} height={150} alt={gift.title} />
                <GiftDescription>{gift.description}</GiftDescription>
                <ButtonLink href={`/gifts/${gift.id}`}>
                  View {gift.title} Gifts
                </ButtonLink>
              </GiftCard>
            ))}
          </GiftCardGrid>

          <Elements stripe={stripePromise}>
            <CustomGiftForm />
          </Elements>

          {selectedGift && (
            <Elements stripe={stripePromise}>
              <GiftModal
                isOpen={true}
                onClose={() => setSelectedGift(null)}
                gift={selectedGift}
                amount={selectedGift.amount}
              />
            </Elements>
          )}
        </Page>
      </Layout>
    </>
  );
}
