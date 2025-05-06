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
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.ui};
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.lightError};
    color: ${props => props.theme.colors.error};
    cursor: not-allowed;
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
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  font-family: ${props => props.theme.fonts.ui};
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

  const handleGiftClaim = async (giftId) => {
    if (!inviteCode) return alert('Please enter your invite code to reserve this gift.');

    await axios.patch(`/api/gifts/${giftId}`, { from: inviteCode });
    window.location.reload();
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
                onClick={() => onGiftClick(gift)}
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
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', textAlign: 'center', color: '#0b3d2e' }}>
           Personalize Your Gift
        </h3>
        <Label>What should we use it for?</Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Label>How much would you like to give?</Label>
        <Input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <Label>Your Invite Code</Label>
        <Input
          type="text"
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          required
        />
        <Label>Optional Message</Label>
        <TextArea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Gift'}
        </Button>
      </Form>
      }
    </>
  );
}
