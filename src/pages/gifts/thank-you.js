import styled from 'styled-components';
import Layout from '@/components/Layout';
import NavBar from '@/components/NavBar';
import { Page } from '@/components/Page';
import { SectionHeading } from '@/components/Section';

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin: 1.5rem 0;
  text-align: center;
`;

const Button = styled.button`
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
  max-width: 300px;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

export default function ThankYouPage() {
  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>Thank You!</SectionHeading>
          <Paragraph>
            Thank you so much for your generous gift! We're truly touched by your thoughtfulness and can't wait to create these special memories together.
          </Paragraph>
          <Paragraph>
            You'll receive a confirmation email shortly with the details of your gift.
          </Paragraph>
          <Button onClick={() => window.location.href = '/'}>
            Return to Home
          </Button>
        </Page>
      </Layout>
    </>
  );
} 