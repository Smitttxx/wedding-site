import styled from 'styled-components';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import {Page} from '@/components/Page';
import {SectionHeading} from '@/components/Section';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, CardElement, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import GiftModal from '../../components/GiftModal';
import {Input} from "@/components/Input";
import {Textarea} from "@/components/TextArea";
import {StyledCardElement} from "@/components/CardElement";
import {Button} from "@/components/Button";
import {Label} from "@/components/Label";
import {ButtonLink} from "../../components/ButtonLink";
import GiftCard from '../../components/GiftCard';

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

const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.lightAccent};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 
    0 4px 12px rgba(191, 161, 78, 0.15),
    0 0 0 1px ${({ theme }) => theme.colors.accent},
    0 0 0 4px ${({ theme }) => theme.colors.lightAccent};
  border: 2px solid ${({ theme }) => theme.colors.accent};
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

const FormTitle = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  border-bottom: 2px dashed ${({ theme }) => theme.colors.accent};
  padding-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(191, 161, 78, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.base};
`;

const gifts = [
  {
    id: 'cruise',
    title: 'Honeymoon Memories',
    image: '/cruise.webp',
    description: 'Help us make amazing memories on our honeymoon.',
    section: 'TheCruise',
  },
  {
    id: 'garden',
    title: "Sully's Garden",
    image: '/garden.jpg',
    description: "Our current garden needs a lot of work for it to be safe for Sully. Help us create a magical little garden — a space for running wild, growing veggies, and making mud pies.",
    section: 'SullysGarden',
  }
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
        const saveRes = await axios.post('/api/save-gift', {
          name: formData.name,
          message: formData.message,
          giftId: giftResponse.data.id,
          amount: parseFloat(formData.amount) * 100,
          paymentIntentId: result.paymentIntent.id,
        });
        router.push(`/gifts/thank-you?purchaseId=${saveRes.data.purchaseId}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Something else in mind? Customise your own personal gift for the Bride and Groom</FormTitle>
      {"Each gift—no matter the size—is a part of the foundation we're building together. We're so grateful for your love and kindness."}
      
        < br />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <Textarea
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
        <Button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : `Gift £${formData.amount || '0.00'}`}
        </Button>
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
              <GiftCard
                key={gift.id}
                title={gift.title}
                image={gift.image}
                amount={gift.amount}
                description={gift.description}
              >
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
                clientSecret={selectedGift.clientSecret}
              />
            </Elements>
          )}
        </Page>
      </Layout>
    </>
  );
}
