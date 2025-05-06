import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.large};
  justify-content: center;
  margin: ${props => props.theme.spacing.large} 0;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.medium};
  width: 280px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: ${props => props.theme.fonts.base};
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

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.ui};
  width: 100%;
  transition: all 0.3s ease;
  font-size: 1.1rem;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(191, 161, 78, 0.2);
  }

  &:disabled {
    background: ${props => props.theme.colors.lightError};
    color: ${props => props.theme.colors.error};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;


export default function GiftSection({ gifts, section, onGiftClick }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    from: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [inviteCode, setInviteCode] = useState('');

  const handleGiftClick = async (gift) => {
    try {
      const response = await axios.post('/api/create-gift-payment-intent', {
        amount: gift.amount,
        giftId: gift.id,
      });
      
      onGiftClick({
        ...gift,
        clientSecret: response.data.clientSecret
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await axios.post('/api/gifts', {
      section,
      name: formData.name,
      amount: parseInt(formData.amount),
      from: formData.from,
      message: formData.message,
    });

    setFormData({ name: '', amount: '', from: '', message: '' });
    setSubmitting(false);
  };

  return (
    <>
      <Grid>
        {gifts.map((gift) => {
          console.log(gift)
          if (gift.section !== "GeneralGifts") {
            const remaining = gift.quantity ? gift.quantity - gift.claimed : null;
            const soldOut = remaining !== null && remaining <= 0;

            return (
              <Card key={gift.id}>
                <GiftTitle>{gift.name}</GiftTitle>
                {gift.imagePath && (
                  <GiftImage 
                    src={gift.imagePath} 
                    width={220} 
                    height={150} 
                    alt={gift.name} 
                  />
                )}
                <GiftDescription>{gift.description}</GiftDescription>
                {remaining !== null && (
                  <p>Remaining: {remaining} of {gift.quantity}</p>
                )}
                <Button 
                  onClick={() => handleGiftClick(gift)}
                  disabled={soldOut}
                >
                  {soldOut ? 'Already Gifted' : `Gift £${(gift.amount / 100).toFixed(2)}`}
                </Button>
              </Card>
            );
          }
          return null;
        })}
      </Grid>
    </>
  );
}
