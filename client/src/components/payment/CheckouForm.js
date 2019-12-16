import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardNumberElement, CardExpiryElement, CardCvcElement, } from 'react-stripe-elements';
import Loading from '../../Utils/Loading'
import PaySuccess from './PaySuccess'
import MainNav from "../NavBars/MainNav/MainNav";

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
    fontSize: "1.5vh"
  },
  err: {
    color: 'red',
    fontSize: "16px"
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
}) {
  const classes = useStyles();

  return (
    <>
      <MainNav />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Grid container spacing={2}>
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
              {formError && <p className={classes.err}>Detaliile Cardului lipsesc sau  nu sunt sunt valide</p>}
            </Grid>

            <Grid item xs={12}>
              {requestError && <p className={classes.err}>A avut loc o eroare la server.Va rog incercati din nou</p>}
            </Grid>
          </Grid>
          {success ? <PaySuccess /> :
            <form onSubmit={handleSubmit} className={classes.form} >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <input
                    name="email"
                    placeholder="Adresa de mail"
                    onChange={handleInputChange}
                    className={classes.cardDetails}
                    type="email"
                  />
                </Grid>

                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <input
                    name="cardName"
                    placeholder="Numele Cardului"
                    onChange={handleInputChange}
                    className={classes.cardDetails}
                    type="text"
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
                Achita 199 LEI
          </Button>
            </form>}
        </div>

      </Container>
    </>
  );
}