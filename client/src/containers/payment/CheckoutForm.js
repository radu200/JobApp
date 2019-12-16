import React, {Component} from 'react';
import {injectStripe} from 'react-stripe-elements';
import Checkout  from '../../components/payment/CheckouForm'
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
      err:false

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
      const value = e.target.value
      const name = e.target.name
      this.setState({
        [name]:value
      })
  }
 

  
  async submit(e) {
     e.preventDefault()
     const { cardCvc, cardNumber, cardExpiry, email, cardName} = this.state


     if(cardNumber && cardCvc && cardExpiry){
       const {token} = await this.props.stripe.createToken({name: cardName,email:email});
       const response = await axios.post(
       "/api/payment",
        { token }
      );
       const { status } = response.data;
      console.log("Response:", response.data);
      if (status === "success") {
        console.log('succes')
      } else {
        console.log('errr')
      }
        
     } else { 
       this.setState({err:true})
     }

  }


  render() {
    const { err } = this.state
    return (
      <div className="checkout">
         <Checkout  
           handleSubmit={this.submit}
           handleCardChange={this.handleCardChange}
           handleInputChange={this.handleInputChange}
           err={err}
         />
        {/* <button onClick={this.submit}>Purchase</button> */}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);