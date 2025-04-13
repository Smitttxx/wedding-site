import {Fragment, useState} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import {AnimatedSection, SectionHeading} from '../../components/Section';
import {Page} from "@/components/Page";
import LoadingIndicator, {LoadingOverlay} from "@/components/LoadingOverlay";
import NavBar from "@/components/NavBar";
import {TartanInfoBox} from "@/components/TartanInfoBox";

const Input = styled.input`
  padding: 1rem;
  font-size: 1.25rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  margin-top: 1rem;
  background-image: url('/black-watch-tartan.png');
  background-repeat: repeat;
  background-size: cover;
  background-color: white;
  color: ${props => props.theme.colors.accent};
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1); /* Slight white overlay */
  outline: 2px solid ${props => props.theme.colors.primary};
  background-blend-mode: lighten;
  
  /* Change background opacity on focus (dull effect) */
  &:focus {
    background-color: rgba(255, 255, 255, 0.4); /* Slight white overlay */
    background-blend-mode: lighten;
    outline: none; /* Optional: removes default blue border */
    outline: 2px solid ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    text-transform: uppercase;
  }

  /* Change placeholder text color */
  &::placeholder {
    color: #999; /* Adjust to whatever color you want */
    opacity: 1; /* Required for Firefox to override default */
  }
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const Error = styled.p`
  margin-top: 1rem;
  color: ${props => props.theme.colors.error};
  font-weight: bold;
`;

const Intro = styled.div`
  margin-bottom: 2rem;

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.text};
  }
`;

const SubText = styled.p`
  font-size: 1.05rem;
  color: ${props => props.theme.colors.text};
  margin-top: 0.75rem;
`;

const HighlightedWelcome = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary}; // Assume this is the gold
  margin: 1rem 0;
  font-family: ${props => props.theme.fonts.heading};
  text-shadow: 
    0 0 4px rgba(0, 0, 0, 0.4);     /* subtle outer glow for lift */
`;


export default function InvitePage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
  
    setError('');
    setIsLoading(true);
  
    try {
      const res = await fetch(`/api/invite/${code}`);
      if (!res.ok) throw new Error();
  
      const data = await res.json();
  
      sessionStorage.setItem('hasAccess', 'true');
  
      if (data.paid) {
        // ✅ Redirect directly to the payment success page
        router.push(`/invite/payment?inviteCode=${code}&success=true`);
      } else {
        // Proceed to RSVP form
        router.push(`/invite/${code}`);
      }
    } catch {
      setError('That code doesn’t seem to work. Double check your invite and try again!');
      setIsLoading(false);
    }
  };  


  const Wrapper = styled.div`
  position: relative;
`;

  if (isLoading) {
    return (
      <Fragment>
      <NavBar />
      <Layout>
        <Page>
        <LoadingIndicator   />     </Page>
      </Layout>
      </Fragment>
    );
  }

  return (
    <Fragment>
            <NavBar />
    <Layout>
        <Page>
        <HighlightedWelcome>{"Invite for Laura & Joe's wedding!"}</HighlightedWelcome>
          <AnimatedSection>
          <SectionHeading>Welcome to the Scottish Highlands!</SectionHeading>
          <Intro>
            <p>We’re so glad you’ve received your invite. Please enter your invite code below to RSVP and unlock the rest of the wedding info — from Friday night festivities, to accommodation, and transport.</p>
            <SubText>
              {"Once you've RSVP’d, you’ll be able to update your preferences. If you need any help, just reach out to Laura or Joe!"}
            </SubText>
          </Intro>

            {error && <TartanInfoBox error>{error}</TartanInfoBox>}
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Code on Invite..."
              value={code}
              onChange={e => setCode(e.target.value.trim().toLowerCase())}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Checking code...' : 'Continue'}
            </Button>
            </form>
            </AnimatedSection>
      </Page>
      </Layout>
      </Fragment>
  );
}
