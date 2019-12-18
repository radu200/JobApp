import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';



class Checkout extends Component {
    render() {
      return (
        <StripeProvider apiKey="pk_test_nNxzgIgsaSXJMAmquwH7D0DI">
          <div className="example">
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      );
    }
  }

export default Checkout;