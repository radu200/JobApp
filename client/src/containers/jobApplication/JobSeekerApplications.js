import React, { Component } from "react";
import JobCard from "../../components/Cards/JobSeekerApplications";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import MainNav from "../../components/NavBars/MainNav/MainNav";
import GetMoreButton from "../../components/Buttons/ButtonOutlined";
import { getJobseekerApplications } from "../../api/jobs";
import Loading from '../../Utils/Loading'

const styles = theme => ({
  root: {
    maxWidth: 960,
  },
});

class ApplicantsActive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      offset: 0,
      loading:false,
      error: null,
    };
  }

  async componentDidMount() {
    const { offset } = this.state;

    try {
      this.setState({loading:true})
      const res = await getJobseekerApplications(offset);
      if(res.status === 200){
        this.setState({
          jobs: res.data.jobs,
          offset: offset + 12,
          loading:false
        });
      }
    } catch (error) {
      this.setState({
        error,
      });
    }
  }

  getMoreJobs = async () => {
    const { offset, jobs } = this.state;
    try {
      const data = await getJobseekerApplications(offset);
      this.setState({ jobs: [...jobs, ...data.jobs], offset: offset + 12 });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { jobs, loading} = this.state;
    const { getMoreJobs } = this;
    return (
      <>
        <MainNav />
        {loading && <Loading />}
        <div className={classes.root}>
          <Grid container spacing={0} justify="center" alignItems="center">
            <Grid item xs={12} sm={12} md={8}>
              <h3>Joburi Aplicate: {jobs.length}</h3>
              <JobCard job={jobs} />
              {jobs.length >= 12 ? (
                <GetMoreButton onClick={getMoreJobs} buttonText="Mai Mult" />
              ) : null}
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ApplicantsActive);
