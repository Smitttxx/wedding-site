import styled from 'styled-components';
import Image from 'next/image';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import {AnimatedSection, Section, SectionHeading} from '../components/Section';
import {Page} from "@/components/Page";
import {differenceInDays} from 'date-fns';
import {TartanInfoBox} from "@/components/TartanInfoBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock, faMapLocationDot} from '@fortawesome/free-solid-svg-icons';
import {InfoBlock} from "@/components/InfoBlock";
import WeddingTimeline from "@/components/WeddingTimeline";

const TopNotice = styled.div`
  background: ${props => props.theme.colors.accent};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const RSVPButton = styled.a`
  display: inline-block;
  margin-top: 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const Paragraph = styled.p`
  font-size: 1.15rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin: 1.5rem auto;
  max-width: 700px;
`;

const PhotoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem auto;
`;

const Snapshot = styled(Image)`
  border-radius: 12px;
`;

const IntroImage = styled(Image)`
  border-radius: 12px;
  margin-bottom: 1.5rem;
  max-width: 100%;
  height: auto;
`;

const ExcitedMessage = styled.p`
  font-size: 1.15rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
`;

const Countdown = () => {
  const weddingDate = new Date('2025-09-13');
  const today = new Date();
  const days = differenceInDays(weddingDate, today);
  return <>{days}</>;
};

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>Laura & Joe’s Wedding</SectionHeading>
          <IntroImage src="/outdoor-wedding.avif" alt="View of Loch Tay" width={700} height={400} />
          <ExcitedMessage>
            We’re so excited to welcome you to Borelands and share the beautiful views of Loch Tay with you!<br />
            It’s going to be the best weekend of our lives — and we’re so happy you’ll be part of it. Let’s celebrate, laugh, cry, dance (a lot), and make some magic memories together. ✨
          </ExcitedMessage>
          <TartanInfoBox>
            Only <span><Countdown /></span> days until the big day!
          </TartanInfoBox>


          <AnimatedSection >
            <SectionHeading>Got your invite?</SectionHeading>

            <Paragraph>
              Amazing! You can head straight to the RSVP page to confirm your details — or, have a little nosey around first!
              There’s info here about Friday’s welcome BBQ, the venue, the bar, and more.
              If you have any questions, just give Laura or Joe a shout.
            </Paragraph>

            <RSVPButton href="/invite">Go to RSVP Page →</RSVPButton>
          </AnimatedSection>

          <AnimatedSection >
            <SectionHeading>Our Story</SectionHeading>
            <Paragraph>
            We met at a gaming event in Liverpool and quickly became inseparable. A few years later, while on a cruise through Belgium (and very pregnant), Joe proposed. Now we’re getting married — and best of all, we get to share it with our little one, Sully.
            </Paragraph>

            <PhotoRow>
              <Snapshot src="/familyPhoto.jpg" alt="Family Photo" width={250} height={200} layout="responsive" />
            </PhotoRow>

          </AnimatedSection>
          <AnimatedSection >
          <SectionHeading>The Venue</SectionHeading>
          <Snapshot
            src="/loachtay.jpg"
            alt="The Venue"
            width={700}
            height={400}
            layout="responsive"
          />
          <Paragraph>
            The wedding weekend takes place at Borelands, perched above the stunning Loch Tay. Join us for a relaxed celebration
            full of Scottish charm — think views, bonfires, and togetherness.
            </Paragraph>
            <InfoBlock>
            <FontAwesomeIcon icon={faMapLocationDot} /> Address: Boreland Farm, Fearnan, Aberfeldy PH15 2PG

            </InfoBlock>

          </AnimatedSection>


          

          <AnimatedSection >
            <SectionHeading>Friday Night</SectionHeading>
            <Snapshot src="/cowshed.webp" alt="Friday Night" width={700} height={400} layout="responsive" />
            <Paragraph>
          We’d love to welcome everyone to Borelands the night before the wedding with a relaxed BBQ.  
  The food’s on us — and it’s extra special, cooked over an open flame by the father of the bride and the father of the groom.  
  If you’d like to bring a bottle of wine or something you love to drink, we’ll have glasses ready and waiting.  
  Expect fires, good music, and a chance to catch up before the big day.
            </Paragraph>
            <InfoBlock>
              <FontAwesomeIcon icon={faClock} />  Festivities kick off around 6pm on Friday evening
            </InfoBlock>
          </AnimatedSection>

          <AnimatedSection >
            <SectionHeading>The Big Day</SectionHeading>
            <IntroImage src="/indoor-wedding.jpeg" alt="View of Loch Tay" width={700} height={400} layout="responsive" />
            <Paragraph>
  {"We've planned the day to flow naturally, with plenty of time for celebration, laughter, and relaxed moments together. "}
 {" Here's what to expect from the big day — from welcome drinks to the final song."}
</Paragraph>
            <SectionHeading>Order of the Day</SectionHeading>
            <WeddingTimeline />
          </AnimatedSection>

          <AnimatedSection >
            <SectionHeading>Bar Details</SectionHeading>
            <Snapshot src="/bar.jpeg" alt="Bar" width={700} height={400} layout="responsive"
            />
            <Paragraph>
              Friday is bring your own bottle. On Saturday, there’ll be a fully stocked bar. No need to bring anything — just bring your best dance moves!
            </Paragraph>
          </AnimatedSection>

          <AnimatedSection >
            <SectionHeading>RSVP</SectionHeading>
            <Paragraph>
              Head to the RSVP page and enter your code to confirm your attendance, dietary needs, and accommodation preferences.
              We can’t wait to celebrate with you!
            </Paragraph>
            <RSVPButton href="/invite">Go to RSVP Page →</RSVPButton>
          </AnimatedSection>


          <AnimatedSection >
            <SectionHeading>Gifts</SectionHeading>
            <Snapshot src="/cruise.webp" alt="Gifts" width={700} height={400} layout="responsive"
            />
            <Paragraph>
              Your presence is the best gift. But if youd like to contribute, we’ve set up a page for you to view our wishes.
            </Paragraph>
            <RSVPButton href="/gifts">Go to Gifts Page →</RSVPButton>
          </AnimatedSection>
        </Page>
      </Layout>
    </>
  );
}
