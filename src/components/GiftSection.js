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

const ClaimForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  align-items: center;
`;

const Form = styled.form`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-family: ${props => props.theme.fonts.base};
  background: ${props => props.theme.colors.lightAccent};
  padding: 2.5rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 
    0 4px 12px rgba(191, 161, 78, 0.15),
    0 0 0 1px ${props => props.theme.colors.accent},
    0 0 0 4px ${props => props.theme.colors.lightAccent};
  border: 2px solid ${props => props.theme.colors.accent};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.lightAccent});
    border-radius: ${props => props.theme.borderRadius};
    z-index: -1;
    opacity: 0.5;
  }
`;

const FormTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 2px dashed ${props => props.theme.colors.accent};
  padding-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(191, 161, 78, 0.1);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  width: 100%;
  font-family: ${props => props.theme.fonts.base};
  transition: all 0.3s ease;
  background: white;
  box-shadow: inset 0 1px 3px rgba(191, 161, 78, 0.1);

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 
      0 0 0 2px rgba(191, 161, 78, 0.1),
      inset 0 1px 3px rgba(191, 161, 78, 0.1);
  }

  &:disabled {
    background: ${props => props.theme.colors.background};
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  width: 100%;
  font-family: ${props => props.theme.fonts.base};
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;
  background: white;
  box-shadow: inset 0 1px 3px rgba(191, 161, 78, 0.1);

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 
      0 0 0 2px rgba(191, 161, 78, 0.1),
      inset 0 1px 3px rgba(191, 161, 78, 0.1);
  }

  &:disabled {
    background: ${props => props.theme.colors.background};
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  font-weight: bold;
  font-family: ${props => props.theme.fonts.ui};
  color: ${props => props.theme.colors.primary};
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(191, 161, 78, 0.1);
`;

const CardElementWrapper = styled.div`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  background: white;
  box-shadow: inset 0 1px 3px rgba(191, 161, 78, 0.1);
  margin-bottom: 1rem;

  &:focus-within {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 
      0 0 0 2px rgba(191, 161, 78, 0.1),
      inset 0 1px 3px rgba(191, 161, 78, 0.1);
  }
`;

const PostcodeInput = styled(Input)`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: ${props => props.theme.fonts.ui};
`;

const AmountInput = styled(Input)`
  font-family: ${props => props.theme.fonts.ui};
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
  padding: 1rem;
`;

const SubmitButton = styled(Button)`
  margin-top: 2rem;
  font-size: 1.2rem;
  padding: 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
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
                {soldOut ? 'Sold Out' : `Gift £${(gift.amount / 100).toFixed(2)}`}
              </Button>
            </Card>
          );
        })}
      </Grid>

      {section === "general-gifts" &&       
      <Form onSubmit={handleFormSubmit}>
        <FormTitle>Personalize Your Gift</FormTitle>
        <Label>What should we use it for?</Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={submitting}
          placeholder="e.g. Honeymoon Fund"
        />
        <Label>How much would you like to give?</Label>
        <Input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
          disabled={submitting}
          placeholder="e.g. 50"
          min="1"
        />
        <Label>Your Invite Code</Label>
        <Input
          type="text"
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          required
          disabled={submitting}
          placeholder="Enter your invite code"
        />
        <Label>Optional Message</Label>
        <TextArea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          disabled={submitting}
          placeholder="Add a personal message (optional)"
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Processing Gift...' : 'Send Gift'}
        </Button>
      </Form>
      }
    </>
  );
}
