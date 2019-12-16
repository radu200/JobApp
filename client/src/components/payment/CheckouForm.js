import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  CardNumberElement, CardExpiryElement, CardCvcElement,
  Elements
} from 'react-stripe-elements';

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

  },
  err:{
    color:'red',
    fontSize:"16px"
  }
}));


 // handle focus on card  elements
const handleFocus = (focus) => {

  console.log('[focus]');
   
};


export default function Checkout({ handleSubmit, handleCardChange,handleInputChange, err }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">

        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Adresa de mail"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <CardNumberElement
                onChange={handleCardChange}
                onFocus={handleFocus}
                className={classes.cardDetails}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CardExpiryElement
                onChange={handleCardChange}
                onFocus={handleFocus}
                className={classes.cardDetails} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CardCvcElement
                onChange={handleCardChange}
                className={classes.cardDetails} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="cardName"
                name="cardName"
                variant="outlined"
                required
                fullWidth
                id="cardName"
                label="Numele Cardului"
                onChange={handleInputChange}

              />
            </Grid>

            <Grid item xs={12}>
              {err && <p className={classes.err}>Detailile Cardului nu sunt sunt valide</p>}
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
        </form>
      </div>
    </Container>
  );
}