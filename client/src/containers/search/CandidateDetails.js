import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import MainNav from "../../components/NavBars/MainNav/MainNav";
import { getCandidateDetails } from "../../api/users";
const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
  },
});

class CandidateDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidate: [],
      experience: [],
    };
  }

  async componentDidMount() {
    // const { match } = this.props
    // const id = match.params.id;
    // try {
    //   const data = await getCandidateDetails(id);
    //     this.setState({
    //       candidate: data.details,
    //       experience: data.experience
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  render() {
    const { classes } = this.props;
    const { candidate, experience } = this.state;
    return (
      <div>
        <MainNav />
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={6}>
              {/* <CandidateDetailsCard
                candidate={candidate}
                experience={experience}
              /> */}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CandidateDetails);
