import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { SectionHeading } from '../../components/Section';
import { Page } from "@/components/Page";

const Message = styled.p`
  font-size: 1.25rem;
  margin: 1rem 0 1.5rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const Note = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.5;
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

        {isAttending ? (
          <>
            <Message>
              We’re so glad you’ll be joining us to celebrate our big day in the Scottish Highlands! 💛
              <br /><br />
              You’ve let us know you’ll be arranging your own accommodation — thank you! We’ll keep you posted with travel tips and party updates.
            </Message>

            <Note>
              If your plans change and you’d like to stay on-site (if space opens up), just let us know. We’d love to have you nearby!
            </Note>
          </>
        ) : (
          <>
            <Message>
              We’re really sorry you won’t be able to join us — but thank you so much for letting us know.
            </Message>

            <Note>
              If your plans change, please don’t hesitate to get in touch. We’d love to celebrate with you if you’re able to make it!
            </Note>
          </>
        )}
      </Page>
    </Layout>
  );
}
