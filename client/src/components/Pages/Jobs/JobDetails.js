import React from 'react'
import MainNav from "../../NavBars/MainNav/MainNav";
import JobDetailsCard from '../../Cards/JobDetails'
import { Grid } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 1200,
      marginTop: 0,
      marginRight: "auto",
      marginBottom: 0,
      marginLeft: "auto"
    }
  });
  
const JobDetailsPage =  ({job, classes,handleApplyJob, loading, error, jobStatus, appliedJob}) => {
    return (
        <>
           <MainNav/>
           <div className={classes.root} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <JobDetailsCard 
                          job={job} 
                          handleApplyJob={handleApplyJob}
                          jobStatus={jobStatus}
                          appliedJob={appliedJob}
                          error={error}
                          loading={loading}
                       />
                </Grid>
            </Grid>
          </div>
        </>
    )
}

export default withStyles(styles)(JobDetailsPage)