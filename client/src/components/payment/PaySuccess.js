import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 1),
    backgroundColor: "#43A048",
    color:'white'
  },
}));

const PaySuccess = () => {
    const classes = useStyles();

    return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Va multumim ca ne-ati ales pe noi.
        </Typography>
          Comanda dvs. a fost procesat cu succes.
         <Typography component="p">

        </Typography>
      </Paper>)
}

export default PaySuccess