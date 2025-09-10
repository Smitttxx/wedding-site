import styled from 'styled-components';
import axios from 'axios';
import {Button} from "./Button";
import GiftCard from './GiftCard';

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

export default function GiftSection({gifts, onGiftClick}) {
  const handleGiftClick = async (gift) => {
    // Check availability before opening modal
    const remaining = gift.quantity ? gift.quantity - gift.claimed : null;
    const soldOut = remaining !== null && remaining <= 0;
    
    if (soldOut) {
      alert('Sorry, this gift is no longer available. Please refresh the page to see updated availability.');
      window.location.reload();
      return;
    }
    
    // Just pass the gift to the modal - payment intent will be created when form is submitted
    onGiftClick(gift);
  };

  return (
    <>
      <CardGrid>
        {gifts.map((gift) => {
          if (gift.section !== "GeneralGifts") {
            const remaining = gift.quantity ? gift.quantity - gift.claimed : null;
            const soldOut = remaining !== null && remaining <= 0;

            return (
              <GiftCard
                key={gift.id}
                title={gift.name}
                image={gift.imagePath}
                amount={gift.amount}
                description={gift.description}
              >
                {remaining !== null && (
                  <p style={{textAlign: 'center', margin: '0 0 0.5rem 0'}}>Remaining: {remaining} of {gift.quantity}</p>
                )}
                <Button 
                  onClick={() => handleGiftClick(gift)}
                  disabled={soldOut}
                >
                  {soldOut ? 'Already Gifted' : `Gift £${(gift.amount / 100).toFixed(2)}`}
                </Button>
              </GiftCard>
            );
          }
          return null;
        })}
      </CardGrid>
    </>
  );
}
