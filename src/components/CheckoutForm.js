import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {Button} from "./Button";
import {Label} from "./Label";
import {StyledCardElement} from "./CardElement";
import {Form} from "./Form";
import {Input} from "./Input";

export default function CheckoutForm({ partyId, clientSecret, amount, inviteCode }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [postcode, setPostcode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            postal_code: postcode,
          },
        },
      },
    });

    if (result.error) {
      router.replace(`/payment/${inviteCode}?error=true`);
    } else if (result.paymentIntent.status === 'succeeded') {
      await axios.post('/api/invite/markPaid', { partyId, inviteCode });
      router.replace(`/payment/${inviteCode}?success=true`);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="card-element">Card Details:</Label>
      <StyledCardElement
        id="card-element"
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '16px',
              color: '#000',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
          },
        }}
      />
      <br/>
      <Label htmlFor="postcode">Billing Postcode:</Label>
      <Input
        id="postcode"
        name="postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder="e.g. PH15 2PG"
        required
      />

      <Button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay £${(amount / 100).toFixed(2)}`}
      </Button>
    </Form>
  );
}
