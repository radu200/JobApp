import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
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

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  handleClose,
  open,
  candidate,
  experience,
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
        {/* {loading && <Loading />} */}
        <Card className={classes.card}>
          {candidate.map(candidate => {
            return (
              <CardActionArea key={candidate.id}>
                <CardMedia
                  component="img"
                  // alt={job.category}
                  className={classes.media}
                  height="140"
                  image={candidate.avatar}
                  // title={job.category}
                />
                <CardContent>
                  <Button
                    href={`/api/report/${candidate.id}`}
                    size="small"
                    color="primary"
                  >
                    Raporteaza acest utilizator
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
              </CardActionArea>
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
