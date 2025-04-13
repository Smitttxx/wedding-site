import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import CheckoutForm from '../../components/CheckoutForm';
import PartyHeader from '../../components/PartyHeader';
import Layout from '../../components/Layout';
import Link from 'next/link';
import {Section, SectionHeading} from '@/components/Section';
import {Page} from "@/components/Page";
import {TartanInfoBox} from "@/components/TartanInfoBox";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBed,
  faUsers,
  faUserFriends,
  faSuitcase,
  faBaby,
  faChild,
  faCalendarCheck,
  faCalendarXmark,
  faClock,
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';
import {GoldInfoBox} from "@/components/GoldInfoBox";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Message = styled.p`
  margin-top: 1rem;
  font-style: italic;
  color: ${props => props.theme.colors.success};
`;

const StyledButtonLink = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-top: 2rem;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const Divider = styled.div`
  border-top: 1px dashed ${props => props.theme.colors.accent};
  margin: 0.6rem 0;
`;

const GuestBox = styled.div`
  background-color: ${props => props.theme.colors.lightAccent};
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(191, 161, 78, 0.1);
  color: ${props => props.theme.colors.primary};
  margin: 10px -16px;
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;

  li {
    font-size: 1rem;
    color: ${props => props.theme.colors.text};
    border-bottom: 1px dashed ${props => props.theme.colors.primary};
    padding: 0.25rem 0;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }

  span {
    color: ${props => props.theme.colors.accent};
    font-style: italic;
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

const Text = styled.div`
  color: ${props => props.theme.colors.text};
`;

const StayText = styled.div`
color: ${props => props.theme.colors.text};
line-height: 25px;
`;

export default function PaymentPage() {
  const router = useRouter();
  const {inviteCode} = router.query;

  const [party, setParty] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState(false);

  // Load error state from query
  useEffect(() => {
    const error = router.query.error === 'true';
    setPaymentError(error);
  }, [router.query]);

  useEffect(() => {
    const fetchParty = async () => {
      try {
        const res = await axios.get(`/api/invite/${inviteCode}`);
        const data = res.data;
        setParty(data);

        if (data.accommodationCost && !data.paid) {
          const intentRes = await axios.post('/api/create-payment-intent', {
            guestId: data.id,
          });
          if (intentRes.data.clientSecret) {
            setClientSecret(intentRes.data.clientSecret);
          }
        }
      } catch (err) {
        console.error('Error loading payment info:', err);
      }
    };

    if (inviteCode) fetchParty();
  }, [inviteCode, router.asPath]); // 🧠 refetches after redirect

  if (!party) {
    return (
      <Layout>
        <Page>Loading...</Page>
      </Layout>
    );
  }

  const yourRooms = Array.from(new Set(
    party.guests.map(g => g.room?.name).filter(Boolean)
  ));

  const partyGuestIds = new Set(party.guests.map(g => g.id));

  const othersInCabin = party.cabin?.rooms
    ?.flatMap(room => room.guests)
    ?.filter(g => !partyGuestIds.has(g.id));

  const yourRoomIds = party.guests.map(g => g.room?.id).filter(Boolean);

  const otherGuestsInYourRooms = party.cabin?.rooms?.reduce((acc, room) => {
    if (!yourRoomIds.includes(room.id)) return acc;

    const others = room.guests.filter(g => !partyGuestIds.has(g.id));
    if (others.length) acc[room.name] = others;
    return acc;
  }, {});

  return (
    <Layout>
      <Page>
        <PartyHeader party={party} />
        <Section>
          <SectionHeading>Accommodation Summary</SectionHeading>

          <StayText>
            Your stay includes <br />
            <strong>2 nights only</strong><br />
            from <FontAwesomeIcon icon={faCalendarCheck} /> <strong>Fri 12 Sept</strong><br />
            (check-in from <strong>4pm</strong>) <br />
            to <FontAwesomeIcon icon={faCalendarXmark} /> <strong>Sun 14 Sept</strong><br />
            (check-out by <strong>10am</strong>)<br />
            <strong>Free onsite parking</strong>
          </StayText>

          <Text style={{marginTop: '1rem'}}>
            All cabins are self-catering, the Bride and Groom will pop a small welcome hamper in for your cabin — with milk, tea, and coffee to get you started. Feel free to bring snacks, drinks, or anything you’d like for the weekend.
          </Text>

          <Text style={{marginTop: '1rem'}}>
            Staying on-site means you can enjoy the Friday festivities, have a relaxed space to get ready, and be just a <strong>minute’s walk</strong> from the venue on the big day.
          </Text>

        </Section>



        {party.cabin && (
          <Section>
            <SectionHeading>Your Cabin</SectionHeading>
            <Text><strong>{party.cabin.name}</strong></Text>
          </Section>
        )}

        <div>
          {party.cabin?.rooms
            ?.filter(room => room.guests.some(g => partyGuestIds.has(g.id)))
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map(room => {
              const partyGuestsInRoom = room.guests.filter(g => partyGuestIds.has(g.id));
              const otherGuestsInRoom = room.guests.filter(g => !partyGuestIds.has(g.id));
              const hasBaby = partyGuestsInRoom.some(g => g.isBaby);
              return (
                <Section key={room.id}>
                  {/* Room Name */}
                  <SectionHeading>{room.name}</SectionHeading>
                  <Divider />

                  {/* Room Info */}
                  <Text style={{marginBottom: '1rem'}}>
                    <FontAwesomeIcon icon={faBed} /> <strong>Type:</strong> {room.roomType} &nbsp; | &nbsp;
                    <FontAwesomeIcon icon={faUsers} /> <strong>Capacity:</strong> {room.capacity}
                  </Text>

                  {/* Your Guests */}
                  {partyGuestsInRoom.length > 0 && (
                    <>
                      <GuestBox>
                        <FontAwesomeIcon icon={faUserFriends} /> <strong>Guests on your booking:</strong>
                      </GuestBox>
                      <List>
                        {partyGuestsInRoom.map(g => (
                          <li key={g.id}>
                            {g.firstName} {g.lastName}
                            {g.isBaby && (
                              <FontAwesomeIcon
                                icon={faBaby}
                                style={{marginLeft: '0.5rem'}}
                                title="Baby"
                              />
                            )}
                            {g.isChild && !g.isBaby && (
                              <FontAwesomeIcon
                                icon={faChild}
                                style={{marginLeft: '0.5rem'}}
                                title="Child"
                              />
                            )}
                          </li>
                        ))}
                      </List>
                    </>
                  )}

                  {/* Baby Note */}
                  {hasBaby && (
                    <GoldInfoBox icon={faBaby}>
                      We’re excited to welcome your little one! Please note, travel cots aren’t provided — feel free to bring your own.
                    </GoldInfoBox>
                  )}



                  {/* Other Guests */}
                  {otherGuestsInRoom.length > 0 && (
                    <>
                      <GuestBox>
                        <FontAwesomeIcon icon={faSuitcase} /> <strong>Other guests sharing this room:</strong>
                      </GuestBox>
                      <List>
                        {otherGuestsInRoom.map(g => (
                          <li key={g.id}>
                            {g.firstName} {g.lastName} {g.relation && `(${g.relation})`}
                          </li>
                        ))}
                      </List>
                    </>
                  )}
                </Section>
              );

            })}

        </div>

        {othersInCabin?.length > 0 && (
          <Section>
            <SectionHeading>Other Guests in Your Cabin</SectionHeading>
            <List>
              {othersInCabin.map(g => (
                <li key={g.id}>{g.firstName} {g.lastName} <span>{g.relation && `(${g.relation})`}</span></li>
              ))}
            </List>
          </Section>
        )}

        {!party.paid && (
          <Section>
            <SectionHeading>Not happy with your room selection?</SectionHeading>
            <Text>
              There’s absolutely no pressure to book the room reserved for you — we just wanted everyone close to us to have somewhere safe onsite to rest their head. If you’d prefer to head home after the big day or stay somewhere else, we’ll have a bus running after the wedding to take guests to Kenmore or Aberfeldy.
            </Text>
            <Link href={`/invite/${inviteCode}`} passHref legacyBehavior>
              <StyledButtonLink>← I want to change my accommodation selection</StyledButtonLink>
            </Link>
          </Section>
        )}

        {party.paid ? (
          <Section>
            <SectionHeading>Payment Successful</SectionHeading>
            <TartanInfoBox>
              Your room is secured — thanks for paying!
              We’re so excited to have you staying on-site with us — it means the world.
              Borelands is such a special place, and we’re sure you’re going to fall in love with the views, the vibe, and the weekend ahead.
              Keep an eye out — you’ll receive your booking confirmation soon!
            </TartanInfoBox>
          </Section>
        ) : paymentError ? (
          <>
            <Section>
              <SectionHeading>Payment Failed</SectionHeading>
              <Text>
                The total cost for your stay is <strong>£{(party.accommodationCost / 100).toFixed(2)}</strong> for 2 nights.
              </Text>
              <Text style={{marginTop: '0.5rem'}}>
                That’s <strong>£{((party.accommodationCost / 100) / 2).toFixed(2)}</strong> per night for
                <strong> {party.guests.filter(g => !g.isChild && !g.isBaby).length}</strong> adult{party.guests.filter(g => !g.isChild && !g.isBaby).length !== 1 && 's'}.
              </Text>
              <Text style={{marginTop: '0.5rem'}}>
                <strong>Children and babies stay free</strong> — your cost is based on adults only.
              </Text>
              <GoldInfoBox>
                Oops, something went wrong. Would you like to try again?
              </GoldInfoBox>
              <br />
              <br />
            </Section>
            <Elements stripe={stripePromise} options={{clientSecret}}>
              <CheckoutForm
                partyId={party.id}
                clientSecret={clientSecret}
                amount={party.accommodationCost}
                inviteCode={inviteCode}
              />
            </Elements>
          </>
        ) : clientSecret ? (
          <Section>
            <SectionHeading>Payment</SectionHeading>
            <Text>
              The total cost for your stay is <strong>£{(party.accommodationCost / 100).toFixed(2)}</strong> for 2 nights.
            </Text>
            <Text style={{marginTop: '0.5rem'}}>
              That’s <strong>£{((party.accommodationCost / 100) / 2).toFixed(2)}</strong> per night for
              <strong> {party.guests.filter(g => !g.isChild && !g.isBaby).length}</strong> adult{party.guests.filter(g => !g.isChild && !g.isBaby).length !== 1 && 's'}.
            </Text>
            <Text style={{marginTop: '0.5rem'}}>
              <strong>Children and babies stay free</strong> — your cost is based on adults only.
            </Text>
    
                <GoldInfoBox icon={faCircleExclamation}>
                  <span>
                  Please note if we don’t receive payment by <strong>June 1st 2025</strong>, we may need to offer your room to another guest.
                  </span>
      </GoldInfoBox>
            <Elements stripe={stripePromise} options={{clientSecret}}>
              <CheckoutForm
                partyId={party.id}
                clientSecret={clientSecret}
                amount={party.accommodationCost}
                inviteCode={inviteCode}
              />
            </Elements>
          </Section>
        ) : null}
      </Page>
    </Layout>
  );
}
