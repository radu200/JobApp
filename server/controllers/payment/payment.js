const stripe = require('stripe')(process.env.STRIPE_SKEY);

module.exports.postPayment = async (req,res) => {

  const amount  = 199
  let error;
  let status;
  
  try {
    const {  token } = req.body;
    const email = token.email
    const source = token.id

    if(!email || source){
      status = 'failure'
      return false
    }

    const customer = await stripe.customers.create({
      email,
      source
    });

    const charge = await stripe.charges.create(
       
      {
        amount:amount * 100,
        description: 'membership',
        receipt_email: email,
        currency: 'mdl',
        customer: customer.id
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    status = "failure";
  }

  res.json({ error, status });
 
}
module.exports.getPayment = (req, res) => {
    res.render('./payment/stripe', {
      stripePublishableKey: process.env.STRIPE_PKEY
    });
  }
  
