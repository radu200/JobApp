import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Months, Days, Years } from "../../Utils/messages";
import RoomIcon from "@material-ui/icons/Room";
import CardMedia from "@material-ui/core/CardMedia";
import Loading from "../../Utils/Loading";
import NoUser from "../../images/no_user.png";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    backgroundColor:'#2552C7'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  card: {
    overflowY: "auto",
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
  },
  reportBtn: {
    marginTop: "10px",
    "&:hover": {
      color: "red",
    },
  },
  openChat:{
    backgroundColor:'#2552C7',

  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  handleClose,
  open,
  candidate,
  experience,
  loading,
  handleChat,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {loading && <Loading />}
        <Card className={classes.card}>
          {candidate.map(candidate => {
            return (
              <div key={candidate.id}>
                <CardMedia
                  component="img"
                  alt={candidate.first_name}
                  className={classes.media}
                  height="140"
                  image={candidate.avatar ? candidate.avatar : NoUser}
                />
                <CardContent>
                  <Button
                    className={classes.openChat}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleChat(candidate.id)}
                  >
                    {" "}
                    Deschide Chat <LockOutlinedIcon />
                  </Button>
                  <Button
                    className={classes.reportBtn}
                    href={`/api/report/${candidate.id}`}
                    size="small"
                    color="primary"
                  >
                    Raportea-za
                  </Button>
                  <Typography
                    gutterBottom
                    component="p"
                    className={classes.availability}
                  >
                    {candidate.job_seeker_availability}
                  </Typography>
                  <Typography component="p">
                    {candidate.job_seeker_employment_type}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {candidate.first_name} {candidate.last_name}
                  </Typography>

                  {candidate.job_seeker_about_me ? (
                    <Typography
                      component="p"
                      className={classes.candidateAbout}
                    >
                      <b>Despre: </b> {candidate.job_seeker_about_me}
                    </Typography>
                  ) : null}
                  {candidate.job_seeker_languages ? (
                    <Typography gutterBottom component="p">
                      <b> Limbi: </b>
                      {candidate.job_seeker_languages}
                    </Typography>
                  ) : null}

                  <Typography component="p">
                    <RoomIcon className={classes.RoomIcon} />{" "}
                    {candidate.job_seeker_location}
                  </Typography>
                </CardContent>
              </div>
            );
          })}

          {experience &&
            experience.map((experience, index) => {
              return (
                <CardActionArea key={index}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {experience.position}
                    </Typography>
                    <Typography component="p">{experience.category}</Typography>
                    <Typography component="p" className={classes.companyName}>
                      {experience.company_name}
                    </Typography>
                    <Typography gutterBottom component="p" color="primary">
                      {experience.start_date}- {experience.end_date} -{" "}
                      {experience.years} {Years} {experience.months} {Months}{" "}
                      {experience.days} {Days}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="p"
                      className={classes.responsibilities}
                    >
                      {experience.responsibilities}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              );
            })}
        </Card>
      </Dialog>
    </div>
  );
}
