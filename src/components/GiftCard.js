import styled from 'styled-components';
import Image from 'next/image';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 260px;
  min-height: 420px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 1.5rem 1rem 1rem 1rem;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.base};
`;

const GiftImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  margin-bottom: 0.75rem;
`;

const GiftImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const GiftTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const GiftAmount = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  margin-bottom: 0.5rem;
`;

const GiftDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0.5rem 0 1rem 0;
  flex: 0 0 auto;
`;

const Spacer = styled.div`
  flex: 1 1 auto;
`;

export default function GiftCard({ title, image, amount, description, children }) {
  return (
    <Card>
      <GiftTitle>{title}</GiftTitle>
      <GiftImageWrapper>
        <GiftImage src={image} width={220} height={150} alt={title} />
      </GiftImageWrapper>
      {amount !== undefined && amount !== null && (
        <GiftAmount>£{(amount / 100).toFixed(2)}</GiftAmount>
      )}
      <GiftDescription>{description}</GiftDescription>
      <Spacer />
      {children}
    </Card>
  );
} 