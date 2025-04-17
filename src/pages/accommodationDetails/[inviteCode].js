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
  faMugHot
} from '@fortawesome/free-solid-svg-icons';
import AccommodationConfirmationToggle from "@/components/AccommodationConfirmationToggle";
import LoadingIndicator from "@/components/LoadingOverlay";
import BusOption from "@/components/BusOption";

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

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

const Divider = styled.div`
  border-top: 1px dashed ${props => props.theme.colors.accent};
  margin: 0.6rem 0;
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

const Text = styled.p`
  color: ${props => props.theme.colors.text};
  margin-top: 1rem;
`;

const SectionButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2.5rem;
`;

const GuestBox = styled.div`
  background-color: ${props => props.theme.colors.lightAccent};
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(191, 161, 78, 0.1);
  color: ${props => props.theme.colors.primary};
  margin: 10px -16px;
`;

export default function AccommodationDetailsPage() {
  const router = useRouter();
  const {inviteCode} = router.query;
  const [party, setParty] = useState(null);
  const [error, setError] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme();
  const [needsBus, setNeedsBus] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const res = await axios.get(`/api/invite/${inviteCode}`);
      setParty(res.data);
      setIsLoading(false)

      if (res.data.guestType === 'OtherAccommodation' || res.data.guestType === 'AccommodationNotOffered') {
        router.push(`/invite/${inviteCode}`);
      }

    };

    if (inviteCode) fetchData();
  }, [inviteCode]);

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

  if (!party) return null;

  const yourRooms = Array.from(new Set(
    party.guests.map(g => g.room?.name).filter(Boolean)
  ));

  const partyGuestIds = new Set(party.guests.map(g => g.id));

  const othersInCabin = party.cabin?.rooms
    ?.flatMap(room => room.guests)
    ?.filter(g => !partyGuestIds.has(g.id));

  const cost = (party.accommodationCost / 100).toFixed(2);

  if (!party || isLoading) {
    return (
      <Fragment>
        <NavBar />
        <Layout>
          <Page>
            <LoadingIndicator />
          </Page>
        </Layout>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <NavBar />
      <Layout>
        <Page>
          <PartyHeader party={party} />
          <Text><strong>Thanks for RSVPing{party.paid && " and paying for your accommodation!"}</strong><br />
              We’re so glad you can make it and can’t wait to celebrate with you.
            </Text>
          {
            party.paid &&
            <InfoBlock>
            <strong>Payment of <span style={{color: theme.colors.accent, fontSize: "1.3em"}}> £</span>{cost} received, thanks!</strong><br />
            {party.bookingReference && <Fragment>Your booking reference is:  <span style={{color: theme.colors.accent, fontSize: "1.3em", textTransform: "uppercase"}}> {party.bookingReference}</span><br /></Fragment>}
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
              <strong>Don’t rush off!</strong> Pastries and coffee will be served in the barn until <strong>12pm</strong> after check-out. Swing by for a tasty send-off!
            </InfoBlock>

            <Text>
              All cabins are self-catering. Laura & Joe will pop a small welcome hamper in your cabin — Grooms choice of cereal, Brides choice of cereal, milk, tea, and coffee to get you started.
            </Text>

            <Text>
              Staying on-site means you can enjoy the Friday festivities, get ready with ease, and be just a <strong>minute’s walk</strong> from the venue on the big day.
            </Text>

            <DownloadLink href="/site-map.jpg" download>
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
                      <SectionHeading>{room.name}</SectionHeading>
                      <Divider />

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
                              <div> <strong>{g.firstName} {g.lastName}</strong></div>
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
                        {/* Baby Note */}
                        {hasBaby && (
                          <GoldInfoBox icon={faBaby}>
                            We’re excited to welcome your little one! Please note, travel cots aren’t provided — feel free to bring your own.
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
                    Confirm You’re Staying Offsite
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
