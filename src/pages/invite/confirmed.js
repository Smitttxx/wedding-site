import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { SectionHeading } from '../../components/Section';
import {Page} from "@/components/Page";

const Message = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0 2rem;
  color: ${props => props.theme.colors.text};
`;

const Note = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

const StyledButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.disabled ? '#ccc' : props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: bold;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  text-decoration: none;

  &:hover {
    background: ${props =>
      props.disabled ? '#ccc' : props.theme.colors.primaryDark};
  }
`;

export default function ConfirmedPage() {
  const router = useRouter();
  const { attending, inviteCode, locked } = router.query;

  const isAttending = attending === 'true';
  const isLocked = locked === 'true';
  const returnPath = inviteCode ? `/invite/${inviteCode}` : '/invite';

  return (
    <Layout>
      <Page>
        <SectionHeading>
          {isAttending ? 'Thanks for RSVPing 🎉' : "We'll Miss You 😢"}
        </SectionHeading>

        <Message>
          {isAttending
            ? 'We can’t wait to celebrate with you! You can return to update your dietary or travel info.'
            : 'We’re sorry you can’t make it — thank you for letting us know.'}
        </Message>

        {isLocked ? (
          <>
            <Note>
              If anything changes just let us know, we’d love to see you!
            </Note>
          </>
        ) : (
          <Link href={returnPath} passHref legacyBehavior>
            <StyledButton>← Update your details</StyledButton>
          </Link>
        )}
      </Page>
    </Layout>
  );
}
