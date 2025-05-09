// pages/invite/accommodationDetails.js

import {useRouter} from 'next/router';
import {useEffect, useState, Fragment} from 'react';
import {useTheme} from 'styled-components';
import axios from 'axios';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import NavBar from '@/components/NavBar';
import PartyHeader from '@/components/PartyHeader';
import {Page} from '@/components/Page';
import {Section, SectionHeading} from '@/components/Section';
import {InfoBlock} from '@/components/InfoBlock';
import {GoldInfoBox} from '@/components/GoldInfoBox';
import CabinDetails from '@/components/CabinDetails';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCalendarXmark,
  faChild,
  faUserFriends,
  faSuitcase,
  faBed,
  faUsers,
  faBaby,
  faMoneyBillWave,
  faBus,
  faBath,
  faMugHot,
  faTimesCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import AccommodationConfirmationToggle from "@/components/AccommodationConfirmationToggle";
import LoadingIndicator from "@/components/LoadingOverlay";
import BusOption from "@/components/BusOption";
import {Button} from "@/components/Button";
import {Divider} from "@/components/Divider";
import {List} from "@/components/List";

const DownloadLink = styled.a`
  display: inline-block;
  margin: 2rem auto 0;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  transition: background 0.3s ease;
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const Text = styled.p`
  color: ${props => props.theme.colors.text};
  margin-top: 1rem;
`;

const GuestBox = styled.div`
  background-color: ${props => props.theme.colors.lightAccent};
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(191, 161, 78, 0.1);
  color: ${props => props.theme.colors.primary};
`;

export default function AccommodationDetailsPage() {
  const router = useRouter();
  const {inviteCode} = router.query;
  const [party, setParty] = useState(null);
  const [error, setError] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const [needsBus, setNeedsBus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/invite/${inviteCode}`);
        setParty(res.data);

        if (res.data.guestType === 'OtherAccommodation' || res.data.guestType === 'AccommodationNotOffered') {
          router.push(`/invite/${inviteCode}`);
        }
      } catch (err) {
        console.error('Error fetching party:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (inviteCode) fetchData();
  }, [inviteCode, router]);

  const handleOffsite = async () => {
    await axios.post(`/api/accommodation/update`, {
      partyId: party.id,
      guestType: 'OtherAccommodation',
      needsBus: needsBus
    });

    // Redirect to confirmation page
    router.push(`/confirmed/${inviteCode}`);
  };

  const handleContinue = () => {
    router.push(`/payment/${inviteCode}`);
  };

  if (isLoading) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <LoadingIndicator 
              title="Loading..."
              subtitle="Getting your accommodation details ready"
              fullPage={true}
            />
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
            <Section>
              <SectionHeading>Error</SectionHeading>
              <GoldInfoBox icon={faTimesCircle}>
                We couldn&apos;t find your accommodation details. Please try again or contact us for help.
              </GoldInfoBox>
              <Button onClick={() => router.push('/')}>
                Return to Home
              </Button>
            </Section>
          </Page>
        </Layout>
      </Fragment>
    );
  }

  const yourRooms = Array.from(new Set(
    party.guests.map(g => g.room?.name).filter(Boolean)
  ));

  const partyGuestIds = new Set(party.guests.map(g => g.id));

  const othersInCabin = party.cabin?.rooms
    ?.flatMap(room => room.guests)
    ?.filter(g => !partyGuestIds.has(g.id));

  const cost = (party.totalCost / 100).toFixed(2);

  return (
    <Fragment>
      <NavBar />
      <Layout>
        <Page>
          <PartyHeader party={party} />
          <div style={{
            background: theme.colors.lightAccent,
            borderRadius: theme.borderRadius,
            padding: '1em 1.2em',
            marginBottom: 20,
            color: theme.colors.text,
            fontSize: '1.05em'
          }}>
            {party.paid
              ? <strong>We&apos;re so glad you&apos;ll be joining us – thank you for your RSVP and paying for your accommodation!</strong>
              : <strong>We&apos;re so glad you&apos;ll be joining us – thank you for your RSVP!</strong>
              }
          </div>
          {
            party.paid &&
            <InfoBlock>
              <strong>
                Payment received, thank you!<br />
                You have paid <span style={{color: theme.colors.accent, fontSize: "1.1em"}}>£{cost}</span> for your accommodation<br />
              </strong>
            </InfoBlock>
          }
          
          <Section>
            <SectionHeading>Accommodation Summary</SectionHeading>
            <InfoBlock>
              {!party.paid && <>Total Cost of booking: <strong><span style={{color: theme.colors.accent, fontSize: "1.3em"}}> £</span>{cost}</strong><br /></>}
              Your stay includes: <strong>2 nights</strong><br />
              from <FontAwesomeIcon icon={faCalendarCheck} /> <strong>Fri 12 Sept</strong><br />
              (check-in from <strong>{party.cabin.checkIn}</strong>) <br />
              to <FontAwesomeIcon icon={faCalendarXmark} /> <strong>Sun 14 Sept</strong><br />
              (check-out by <strong>{party.cabin.checkOut}</strong>)<br />
              <strong>Free onsite parking</strong>
              <br />
              <br />
              <FontAwesomeIcon icon={faMugHot} /> {" "}
              <strong>Don&apos;t rush off!</strong> Pastries and coffee will be served in the barn until <strong>12pm</strong> after check-out. Swing by for a tasty send-off!
            </InfoBlock>

            <Text>
              All cabins are self-catering. Laura & Joe will pop a small welcome hamper in your cabin — Grooms choice of cereal, Brides choice of cereal, milk, tea, and coffee to get you started.
            </Text>

            <Text>
              Staying on-site means you can enjoy the Friday festivities, get ready with ease, and be just a <strong>minute&apos;s walk</strong> from the venue on the big day.
            </Text>

            <DownloadLink href="/new-site-map.png" download>
              🗺️ Download the Site Map
            </DownloadLink>

            {party.cabin && <CabinDetails cabin={party.cabin} />}

            <div>
              {party.cabin?.rooms
                ?.filter(room => room.guests.some(g => partyGuestIds.has(g.id)))
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map(room => {
                  const partyGuestsInRoom = room.guests.filter(g => partyGuestIds.has(g.id));
                  const otherGuestsInRoom = room.guests.filter(g => !partyGuestIds.has(g.id));

                  const allSaidNo = partyGuestsInRoom.length > 0 && partyGuestsInRoom.every(g => g.rsvp?.toLowerCase() === 'no');

                  const hasBaby = partyGuestsInRoom.some(g => g.isBaby);
                  const bookingHaveChild = partyGuestsInRoom.some(g => g.isChild || g.isBaby);

                  if (allSaidNo) return null;

                  return (
                    <Section key={room.id}>
                      {/* Room Name */}
                      <SectionHeading>{room.name} Details</SectionHeading>

                      {/* Room Info */}
                      <InfoBlock>
                        <FontAwesomeIcon icon={faBed} /> <strong>Type:</strong> {room.roomType} <br />
                      <FontAwesomeIcon icon={faUsers} /> <strong>Capacity:</strong> {room.capacity} <br/>
                        {room.enSuite
                          &&   <><FontAwesomeIcon icon={faBath} /> <strong>Ensuite:</strong> Yes <br /></>
                         }
                      </InfoBlock>
                      
                      {/* Your Guests */}
                      <>
                        <GuestBox>
                          <FontAwesomeIcon icon={faUserFriends} /> <strong>Guests on your booking:</strong>
                        </GuestBox>
                        <List>
                          {partyGuestsInRoom.map(g => (
                            g.rsvp !== "No" &&
                            <li key={g.id}>
                              <div> <strong>{g.firstName} {g.lastName}
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
                                  </strong></div>
                            </li>
                          ))}
                        </List>
                        {/* Baby Note */}
                          <br/>
                        {hasBaby && (
                          <GoldInfoBox icon={faBaby}>
                            Travel cots are not provided — please feel free to bring your own.
                          </GoldInfoBox>
                        )}
                      </>
                      {/* Other Guests */}
                      {otherGuestsInRoom.length > 0 && (
                        <>
                          <GuestBox>
                            <FontAwesomeIcon icon={faSuitcase} /> Other guests sharing this <strong>room:</strong>
                          </GuestBox>
                          <List>
                            {otherGuestsInRoom.map(g => (
                              <li key={g.id}>
                                {g.firstName} {g.lastName} <span>{g.relation && `(${g.relation})`}</span>
                              </li>
                            ))}
                          </List>
                          {!bookingHaveChild && <Text>{"* Subject to change depending on RSVP responses"}</Text>}
                        </>
                      )}
                    </Section>
                  );

                })}

            </div>

            {othersInCabin?.length > 0 && (
              <Section>
                <SectionHeading>Other Guests sharing this <strong>Cabin:</strong></SectionHeading>
                <List>
                  {othersInCabin.map(g => (
                    <li key={g.id}>{g.firstName} {g.lastName} <span>{g.relation && `(${g.relation})`}</span></li>
                  ))}
                </List>
                <Text>{"* Subject to change depending on RSVP responses"}</Text>
              </Section>
            )}

            {!party.paid &&
              <>  
              <AccommodationConfirmationToggle
                confirmed={confirmed}
                setConfirmed={setConfirmed}
                error={error}
              />
              {confirmed === false && <BusOption needsBus={needsBus} setNeedsBus={setNeedsBus} />}
            </>
            }

            {confirmed !== null && 
              <Button
                onClick={() => {
                  if (confirmed) handleContinue();
                  else handleOffsite();
                }}
              >
                {confirmed ? (
                  <>
                    <FontAwesomeIcon icon={faMoneyBillWave} style={{marginRight: '0.5rem'}} />
                    Confirm & Proceed to Payment
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faBus} style={{marginRight: '0.5rem'}} />
                    Confirm You&apos;re Staying Offsite
                  </>
                )}
              </Button>
            }

          </Section>
        </Page>
      </Layout>
    </Fragment>
  );
}
