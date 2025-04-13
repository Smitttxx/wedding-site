import styled from 'styled-components';
import Image from 'next/image';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import {AnimatedSection, Section, SectionHeading} from '../components/Section';
import {Page} from "@/components/Page";
import {differenceInDays} from 'date-fns';
import {TartanInfoBox} from "@/components/TartanInfoBox";

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
              We met four years ago at a gaming event in Liverpool — not online (though we basically lived online after that).
              We started as best friends, gaming into the early hours, until one Halloween, Joe made the first move. From that
              moment, we were inseparable. In 2022, our greatest adventure began: we became parents to our little whirlwind, Sully.
              Somewhere along the way, Joe popped the question (Laura said yes, obviously), and here we are — planning a wedding with
              our favourite people.
            </Paragraph>

            <PhotoRow>
              <Snapshot src="/image.png" alt="Gaming computers" width={250} height={200} />
              <Snapshot src="/TLP.jpeg" alt="TLP event" width={250} height={200} />
              <Snapshot src="/together.jpeg" alt="Couple holiday" width={250} height={200} />
              <Snapshot src="/now.jpeg" alt="Our son Sully" width={250} height={200} />
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
          </AnimatedSection>

          <AnimatedSection >
            <SectionHeading>Friday Night</SectionHeading>
            <Snapshot src="/cowshed.webp" alt="Friday Night" width={700} height={400} layout="responsive" />
            <Paragraph>
              We’re hosting a laid-back BBQ to welcome everyone to Borelands. Food is on us, but it’s BYOB — bring your favourites!
              Expect fires, good music, and cosy chats before the big day.
            </Paragraph>
          </AnimatedSection>

          <AnimatedSection >
            <SectionHeading>Order of the Day</SectionHeading>
            <IntroImage src="/indoor-wedding.jpeg" alt="View of Loch Tay" width={700} height={400} layout="responsive" />
            <Paragraph>
              Heres how our Saturday unfolds: 💍 12:30 Ceremony, 🥂 13:00 Drinks & Photos, 🍽️ 15:30 Wedding Breakfast, 💃 19:00 Party Begins!
            </Paragraph>
          </AnimatedSection>

          <AnimatedSection >
            <SectionHeading>Bar Details</SectionHeading>
            <Snapshot src="/bar.jpeg" alt="Bar" width={700} height={400} layout="responsive"
            />
            <Paragraph>
              Friday is BYOB. On Saturday, there’ll be a fully stocked bar. No need to bring anything — just bring your best dance moves!
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
