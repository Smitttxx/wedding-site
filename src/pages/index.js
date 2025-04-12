// pages/index.js
import styled, { ThemeProvider, keyframes } from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import theme from '../theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Nav = styled.nav`
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${props => (props.open ? 'flex' : 'none')};
    margin-top: 1rem;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  text-decoration: none;
  scroll-behavior: smooth;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImg = styled(Image)`
  z-index: 1;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 8px;
  max-width: 700px;
  text-align: center;
`;

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const FillerText = styled.h3`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin: 6rem auto 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const SectionImage = styled(Image)`
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const PhotoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Snapshot = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`;

const Timeline = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  color: white;
`;

const TimelineItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1.1rem;

  &::before {
    content: '⏰';
    margin-right: 0.5rem;
  }
`;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Borelands | Laura and Joe</title>
        </Head>

        <Nav>
          <Logo>🌿 L&J</Logo>
          <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>☰</MenuToggle>
          <NavLinks open={menuOpen}>
            <NavLink href="#story">Our Story</NavLink>
            <NavLink href="#venue">The Venue</NavLink>
            <NavLink href="#friday">Friday Night</NavLink>
            <NavLink href="#order">Order of Day</NavLink>
            <NavLink href="#bar">Bar</NavLink>
            <NavLink href="#rsvp">RSVP</NavLink>
            <NavLink href="#gifts">Gifts</NavLink>
          </NavLinks>
        </Nav>

        <HeroSection>
          <BackgroundImg src="/outdoor-wedding.avif" alt="Hero" layout="fill" objectFit="cover" />
          <TextOverlay>
            <h1>BORELANDS</h1>
            <h2>LAURA AND JOE ARE GETTING MARRIED</h2>
            <p>Join us in the heart of the Highlands to celebrate our love!</p>
          </TextOverlay>
        </HeroSection>

        <FillerText>A love that started with laughter and late-night games...</FillerText>

        <Section id="story">
          <SectionTitle>Our Story</SectionTitle>
          <Paragraph>
            We met four years ago at a gaming event in Liverpool — not online (though we basically lived online after that). We started as best friends, gaming into the early hours, until one Halloween, Joe made the first move. From that moment, we were inseparable. We moved in together in Liverpool, became an unbeatable team, and spent the next few years adventuring together — from holidays abroad to cruises and countless game nights. In 2022, our greatest adventure began: we became parents to our little whirlwind, Sully. Somewhere along the way, Joe popped the question (Laura said yes, obviously), and here we are — planning a wedding with our favourite people.
          </Paragraph>
          <PhotoRow>
            <Snapshot src="/image.png" alt="Gaming computers" width={250} height={200} />
            <Snapshot src="/TLP.jpeg" alt="TLP event" width={250} height={200} />
            <Snapshot src="/together.jpeg" alt="Couple holiday" width={250} height={200} />
            <Snapshot src="/now.jpeg" alt="Our son Sully" width={250} height={200} />
          </PhotoRow>
        </Section>

        <FillerText>Now it’s time to gather the people we love most, in the place we love best.</FillerText>

        <Section id="venue">
          <SectionTitle>The Venue</SectionTitle>
          <SectionImage src="/loachtay.jpg" alt="The Venue" width={1000} height={600} />
          <Paragraph>
            The wedding weekend takes place at Borelands, perched above the stunning Loch Tay. Join us for a relaxed celebration full of Scottish charm — think views, bonfires, and togetherness.
          </Paragraph>
          <Paragraph>
            The ceremony will be held on Saturday afternoon, followed by food, drinks, and dancing through the night.
          </Paragraph>
        </Section>

        <FillerText>🔥 Before the vows... a little Friday fun</FillerText>

        <Section id="friday">
          <SectionTitle>Friday Night</SectionTitle>
          <SectionImage src="/cowshed.webp" alt="Friday Night" width={1000} height={600} />
          <Paragraph>
            We’re hosting a laid-back, family-style BBQ to welcome everyone to Borelands. Food will be provided by us, but it’s BYOB — so bring along your favourite drinks. Expect great music, roaring fires, and a cosy chance to meet everyone before the big day. Dress comfy, soak in the views, and try not to be too hungover for Saturday! 😉
          </Paragraph>
        </Section>

        <FillerText>📋 Here’s how the big day will unfold</FillerText>

        <HeroSection id="order">
          <BackgroundImg src="/indoor-wedding.jpeg" alt="Order of Day" layout="fill" objectFit="cover" />
          <TextOverlay>
            <SectionTitle>Order of the Day</SectionTitle>
            <Paragraph>
              Here’s how our Saturday unfolds — filled with laughter, love, and just a little dancing:
            </Paragraph>
            <Timeline>
              <TimelineItem>12:30 – 💍 Vows & Ceremony</TimelineItem>
              <TimelineItem>13:00 – 🥂 Drinks & Family Photos</TimelineItem>
              <TimelineItem>13:30 – 🎶 Music, Canapés & Entertainment</TimelineItem>
              <TimelineItem>15:30 – 🍽️ Wedding Breakfast</TimelineItem>
              <TimelineItem>17:30 – 🗣️ Speeches</TimelineItem>
              <TimelineItem>18:00 – 🍰 Dessert</TimelineItem>
              <TimelineItem>19:00 – 💃 Party Begins (Band starts)</TimelineItem>
              <TimelineItem>23:00 – 🎤 Band Ends</TimelineItem>
              <TimelineItem>00:00 – 💤 Lodges & Carriages</TimelineItem>
            </Timeline>
          </TextOverlay>
        </HeroSection>

        <FillerText>🍻 Cheers to that! What about drinks?</FillerText>

        <Section id="bar">
          <SectionTitle>Bar Details</SectionTitle>
          <SectionImage src="/bar.jpeg" alt="Bar" width={1000} height={600} />
          <Paragraph>
            The Friday is BYOB. On Saturday, a fully stocked bar will be open for the evening. No need to bring anything — just bring your best dance moves!
          </Paragraph>
        </Section>

        <FillerText>✉️ RSVP Time!</FillerText>

<Section id="rsvp">
  <SectionTitle>RSVP Reminder</SectionTitle>
  <Paragraph>
    Please refer to your invitation for your personal RSVP link.
    That’s where you’ll let us know if you’re joining in the fun,
    share any dietary requirements, and confirm your accommodation details.
    We can’t wait to celebrate with you!
  </Paragraph>
</Section>


        <FillerText>💌 Feeling generous?</FillerText>

        <Section id="gifts">
          <SectionTitle>Gifts</SectionTitle>
          <SectionImage src="/cruise.webp" alt="Gifts" width={1000} height={600} />
          <Paragraph>
            Your presence is truly the greatest gift — especially as we know this weekend is a bit of a mini holiday for many of you. But if you feel moved to give something, we’d love you to explore our honeymoon experience catalogue. From cocktails on the beach, to zipline adventures, to spa days and dinner dates — every little moment will help us create memories to start our married life in style. 💛
          </Paragraph>
        </Section>
      </>
    </ThemeProvider>
  );
}
