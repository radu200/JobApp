import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardNumberElement, CardExpiryElement, CardCvcElement, } from 'react-stripe-elements';
import Loading from '../../Utils/Loading'
import PaySuccess from './PaySuccess'
import Visa from '../../assets/cards/visa.svg'
import MasterCard from '../../assets/cards/mastercard.svg'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardDetails: {
    border: '1px solid grey',
    padding: '20px',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px',
    outline: "none",
    backgroundColor: "#ffffff",
    fontSize: "16px"
  },
  err: {
    color: 'red',
    fontSize: '16px',
    textAlign:'center'
  },
  paymentCards:{
    width:'100px',
    display:'flex',
    justifyContent:'space-between'
  }

}));


export default function Checkout({
  handleSubmit,
  handleCardChange,
  handleInputChange,
  formError,
  requestError,
  loading,
  success,
  memberMsg
}) {
  const classes = useStyles();

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
           <div className={classes.paymentCards}>
            <Avatar variant="square" alt="visa" src={Visa} />
            <Avatar variant="square" alt="mastercard" src={MasterCard} />
          </div>
          <Grid container >
            <Grid item xs={12}
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              {loading && <Loading />}
            </Grid>
            <Grid item xs={12}>
              {/* {memberMsg  && <p className={classes.err}>Abonamentul pe acesta luna a fost platit </p>} */}
            </Grid>
            <Grid item xs={12}>
              {formError && <p className={classes.err}>Detaliile Cardului lipsesc sau  nu sunt sunt valide</p>}
            </Grid>

            <Grid item xs={12}>
              {requestError && <p className={classes.err}>A avut loc o eroare la server.Va rog incercati din nou</p>}
            </Grid>
          </Grid>

          {success ? <PaySuccess /> :
            <form onSubmit={handleSubmit} className={classes.form} >
              <Grid container >
                <Grid item xs={12}>
                  <label>Adresa de mail</label>
                  <input
                    name="email"
                    placeholder="Adresa de mail"
                    onChange={handleInputChange}
                    className={classes.cardDetails}
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                   <label>Numele Cardului</label>
                  <input
                    name="cardName"
                    placeholder="Numele Cardului"
                    onChange={handleInputChange}
                    className={classes.cardDetails}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                <label>Numarul Cardului</label>
                  <CardNumberElement
                    onChange={handleCardChange}
                    className={classes.cardDetails}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CardExpiryElement
                    onChange={handleCardChange}
                    className={classes.cardDetails} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardCvcElement
                    onChange={handleCardChange}
                    className={classes.cardDetails}
                    />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Achita 299 LEI
          </Button>
            </form>}
            <p>Platile sunt procesate de Stripe unul din cele mai securizate procesor de plată din lume. Pentru securitatea dvs. noi nu salvam date-le cardului. </p>
        </div>

      </Container>
  );
}