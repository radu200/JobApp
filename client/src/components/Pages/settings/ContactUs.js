import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MainNav from "../../NavBars/MainNav/MainNav";
import MessengerCustomerChat from "react-messenger-customer-chat";
import Badge from "@material-ui/core/Badge";
import { supportEmail } from "../../../Utils/email";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    textAlign: "center",
  },
  text: {
    marginRight: 10,
  },
});

const ContactUs = () => {
  const classes = useStyles();

  return (
    <>
      <MainNav />
      <Grid className={classes.root} container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            className={classes.title}
            variant="h5"
            component="div"
            gutterBottom
          >
            Contacteza-ne
          </Typography>
          <Badge>
            <Typography className={classes.text} variant="h6" component="div">
              Pentru ajutor vă rugăm să ne contactați pe acest mail:
            </Typography>
            <Typography color="secondary" variant="h6" component="div">
              {supportEmail}
            </Typography>
          </Badge>
        </Grid>
      </Grid>
      <MessengerCustomerChat
        pageId="102352537993313"
        appId="2570461776416669"
        htmlRef={window.location.pathname}
      />
    </>
  );
};
export default ContactUs;
