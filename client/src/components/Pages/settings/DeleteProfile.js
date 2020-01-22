import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import MainNav from "../../NavBars/MainNav/MainNav";

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
       display:'flex',
       justifyContent:'center',
       marginTop:20
    },
    title:{
        textAlign:'center'
    }
  });
const DeleteProfile = ({ onClick }) => {
    const classes = useStyles();

    return (
        <>
          <MainNav />
          <Grid className={classes.root} container spacing={2}>
          <Grid   item xs={12} sm={12} md={3}>
            <Typography className={classes.title} variant="h5" component="div" gutterBottom>
                Acesta actiune e ireversibila
            </Typography>
            <Button fullWidth type="submit" color="secondary" variant='contained'  onClick={onClick}>
                Sterge Profile
            </Button>
           </Grid>
          </Grid>
        </>
    )
}
export default DeleteProfile;