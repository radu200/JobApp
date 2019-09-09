import React from 'react';
import CandidateDetailsCard from '../../Cards/CandidateDetailsCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',  
  },

});
const CandidateDetails = ({ candidateDetails,experience,classes}) => {
    return (  
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={6}>
              <CandidateDetailsCard  candidateDetails={candidateDetails}    experience={experience} />
            </Grid>
        </Grid>    
        </div>
    )
}
export default withStyles(styles)(CandidateDetails);