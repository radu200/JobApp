import React, { Component } from "react";
import JobCard from "../../components/Cards/JobSeekerApplications";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import MainNav from "../../components/NavBars/MainNav/MainNav";
import GetMoreButton from "../../components/Buttons/ButtonOutlined";
import { getJobseekerApplications } from '../../api/jobs'

const styles = theme => ({
  root: {
    maxWidth: 960
  }
});

class ApplicantsActive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      offset: 0,
    };
  }

  async componentDidMount() {
    

    const { offset } = this.state;

    try {
      const data  = await getJobseekerApplications(offset)
        this.setState({
          jobs: data.jobs,
          offset: offset + 12
        });
    } catch (error) {
      console.error(error);
    }
  }

  getMoreJobs = async () => {
    const { offset, jobs } = this.state;
    try {
      const data  = await getJobseekerApplications(offset)
      this.setState({ jobs: [...jobs, ...data.jobs], offset: offset + 12 });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { classes } = this.props;
    const { jobs} = this.state;
    const { getMoreJobs } = this;
    return (
      <div>
        <MainNav />
        <div className={classes.root}>
          <Grid container spacing={0} justify="center" alignItems="center">
            <Grid item xs={12} sm={12} md={8}>
              <h3>Joburi Aplicate: {jobs.length}</h3>
              <JobCard job={jobs} />
              {jobs.length >= 12 ? (
                <GetMoreButton onClick={getMoreJobs} />
              ) : null}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ApplicantsActive);
