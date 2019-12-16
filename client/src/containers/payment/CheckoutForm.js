import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements';
import Checkout  from '../../components/payment/CheckouForm'
import { validate, validateEmail } from "../../Utils/validation";

import axios from 'axios'


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber:false,
      cardExpiry:false,
      cardCvc:false,
      cardName:'',
      cardEmail:'',
      formError:false,
      requestError:false,
      loading:false,
      success:false,
    }
    this.submit = this.submit.bind(this);
    this.handleCardChange =  this.handleCardChange.bind(this)
    this.handleInputChange =  this.handleInputChange.bind(this)
  }



  handleCardChange (e){
    this.setState({
     [e.elementType]:e.complete
    })
   

  };
 
  handleInputChange (e) {
    //  inputs value other than built in elements
    const { name , value } = e.target
      this.setState({
        [name]:value
      })
  }
 

  
  async submit(e) {
     e.preventDefault()
     const { cardCvc, cardNumber, cardExpiry, email, cardName} = this.state
     const emailVal = validateEmail(email)
     const cardNameVal = validate(cardName)
    
     if(cardNumber && cardCvc && cardExpiry && cardNameVal.status && emailVal.status){
     
      this.setState({loading:true, formError:false,requestError:false})

       const {token} = await this.props.stripe.createToken({name: cardName,email:email});
       const response = await axios.post( "/api/payment",{ token });
       const { status } = response.data;
      
      if (status === "success") {
        this.setState({loading:false, success:true})
      } else {
        this.setState({requestError:true})
      }
        
     } else { 
       this.setState({formError:true})
     }

  }


  render() {
    const { formError, requestError, loading, success} = this.state
    const { submit, handleCardChange, handleInputChange} = this

    return (
      <div className="checkout">
         <Checkout  
           handleSubmit={submit}
           handleCardChange={handleCardChange}
           handleInputChange={handleInputChange}
           formError={formError}
           requestError={requestError}
           loading={loading}
           success={success}
         />
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);