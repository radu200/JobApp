const stripe = require('stripe')(process.env.STRIPE_SKEY);
const { dbPromise } = require("../.././config/database.js");

module.exports.postPayment = async (req,res) => {

  const amount  = 199
  let error;
  let status;

  try {
    const {  token } = req.body;
    const email = token.email
    const source = token.id

    if(!email || !source){
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
     
    const db = dbPromise;
    const userId = req.user.id
    await db.query('UPDATE users SET member = ?,membership_approved_date = TIMESTAMPADD(MONTH, 1, NOW()) WHERE id = ?', [true, userId])    

    status = "success";
  } catch (error) {
    console.log(err)
    status = "failure";
  }

  res.json({ error, status });
 
}

  
