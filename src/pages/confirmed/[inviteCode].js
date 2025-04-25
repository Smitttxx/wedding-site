import {useRouter} from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import {SectionHeading} from '../../components/Section';
import {Page} from "@/components/Page";
import {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import NavBar from "@/components/NavBar";

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
  const {inviteCode} = router.query;

  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inviteCode) return;

    const fetchParty = async () => {
      try {
        const res = await axios.get(`/api/invite/${inviteCode}`);
        setParty(res.data);
      } catch (err) {
        console.error('Failed to fetch party:', err);
        setError('We couldn’t load your confirmation details. Please try again or contact us.');
      } finally {
        setLoading(false);
      }
    };

    fetchParty();
  }, [inviteCode]);

  const returnPath = inviteCode ? `/invite/${inviteCode}` : '/invite';

  if (loading) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <SectionHeading>Loading...</SectionHeading>
          </Page>
        </Layout>
      </Fragment>
    );
  }

  if (error || !party) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <SectionHeading>Oops!</SectionHeading>
            <Message>{error || 'Something went wrong. Please try again.'}</Message>
          </Page>
        </Layout>
      </Fragment>
    );
  }

  const hasAttendingGuest = party.guests.some(g => g.rsvp === 'Yes');
  const isRsvpLocked = party.rsvpLocked;

  return (
    <Fragment>
      <NavBar />
      <Layout>
        <Page>
        <SectionHeading>
  {hasAttendingGuest
    ? `Thanks for RSVPing, ${party.guests.map(g => g.firstName).join(' & ')}`
    : `We’ll Miss You, ${party.guests.map(g => g.firstName).join(' & ')}`}
</SectionHeading>


          {hasAttendingGuest ? (
            party.guestType === 'AccommodationNotOffered' ? (
              <>
                <Message>
                  We’re so glad you’ll be joining us to celebrate our big day in the Scottish Highlands!
                  <p>
                    There are many lovely places to stay in the nearby towns just a short drive from the venue:
                    <ul>
                      <li>
                       <strong>Kenmore:</strong> approximately <strong>5</strong> minutes by car
                      </li>
                      <li>
                        <strong>Aberfeldy:</strong> approximately <strong>15</strong> minutes by car
                      </li>
                    </ul>
                    <p>
                    A <strong>guest bus</strong> will run from the venue to both towns
                    after the wedding at <strong>11:30pm,</strong> so you can relax and enjoy the celebration.
                    </p>
                  </p>
                </Message>
              </>
            ) : (
              <>
                <Message>
                  We’re so glad you’ll be joining us to celebrate our big day in the Scottish Highlands!
                  <br /><br />
                  You’ve let us know you’ll be arranging your own accommodation — thank you!
                    We’ll keep you posted with travel tips and party updates.
                    <p>
                    A <strong>guest bus</strong> will run from the venue to both towns
                    after the wedding at <strong>11:30pm,</strong> so you can relax and enjoy the celebration.
                    </p>
                </Message>
              </>
            )
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
    </Fragment>
  );
}
