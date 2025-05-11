import {useRouter} from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import {SectionHeading} from '../../components/Section';
import {Page} from "@/components/Page";
import {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import NavBar from "@/components/NavBar";
import {DescriptionText} from "@/components/DescriptionText";
import {Divider} from "@/components/Divider";
import {Label} from "@/components/Label";

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

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
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
        setError('We couldn&apos;t load your confirmation details. Please try again or contact us.');
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
    ? `Thanks for your RSVP, ${party.guests.map(g => g.firstName).join(' & ')}`
    : `We'll Miss You, ${party.guests.map(g => g.firstName).join(' & ')}`}
</SectionHeading>


          {hasAttendingGuest ? (
            party.guestType === 'AccommodationNotOffered' ? (
              <>
                <Divider />
                <Label>
                  We&apos;re so glad you&apos;ll be joining us to celebrate our big day in the Scottish Highlands!
                </Label>
                <br/>
                <DescriptionText>
                  There are many lovely places to stay in the nearby towns just a short drive from the venue:
                  <br/><br/>
                  <List>
                    <li>
                      <strong>Kenmore:</strong> approximately <strong>5</strong> minutes by car
                    </li>
                    <li>
                      <strong>Aberfeldy:</strong> approximately <strong>15</strong> minutes by car
                    </li>
                  </List>
                  </DescriptionText>
              </>
            ) : (
                <>
                  <Divider />
                  <Label>
                  We&apos;re so glad you&apos;ll be joining us to celebrate our big day in the Scottish Highlands!
                  </Label>
                  <br/>
                <DescriptionText>
                  You&apos;ve let us know you&apos;ll be arranging your own accommodation — thank you!
                  We&apos;ll keep you posted with travel tips and party updates.
                  </DescriptionText>
                  <DescriptionText>
                  There are many lovely places to stay in the nearby towns just a short drive from the venue:
                  <br/><br/>
                  <List>
                    <li>
                      <strong>Kenmore:</strong> approximately <strong>5</strong> minutes by car
                    </li>
                    <li>
                      <strong>Aberfeldy:</strong> approximately <strong>15</strong> minutes by car
                    </li>
                  </List>
                  </DescriptionText>
              </>
            )
          ) : (
              <>
                                  <Divider />
              <Label>
                We&apos;re really sorry you won&apos;t be able to join us — but thank you so much for letting us know.
              </Label>
              <DescriptionText>
                If your plans change, please don&apos;t hesitate to get in touch. We&apos;d love to celebrate with you if you&apos;re able to make it!
              </DescriptionText>
            </>
          )}
        </Page>
      </Layout>
    </Fragment>
  );
}
