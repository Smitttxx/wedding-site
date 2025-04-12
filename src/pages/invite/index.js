import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Page = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.25rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  margin-top: 1rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const Error = styled.p`
  margin-top: 1rem;
  color: red;
`;

export default function InvitePage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
	e.preventDefault();
  
	try {
	  // Optional: Validate the code via API
	  const res = await fetch(`/api/guest/${code}`);
	  if (!res.ok) throw new Error();
  
	  // ✅ Set session access flag
	  sessionStorage.setItem('hasAccess', 'true');
  
	  // ✅ Navigate to their guest page
	  router.push(`/guest/${code}`);
	} catch {
	  setError('That code doesn’t seem to work. Double check it and try again!');
	}
  };  

  return (
    <Page>
      <h1>Youre Invited ✨</h1>
      <p>Please enter your invite code to RSVP:</p>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your code (e.g. maria-dougie-21)"
          value={code}
          onChange={e => setCode(e.target.value.trim().toLowerCase())}
        />
        <Button type="submit">Continue</Button>
      </form>
      {error && <Error>{error}</Error>}
    </Page>
  );
}
