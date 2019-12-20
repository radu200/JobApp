import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";


const Loading  = () => {
    return (
        <Grid container spacing={2}>
          <Grid
              item xs={12} sm={12} md={12}
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center">
              <CircularProgress  disableShrink />
            </Grid>
         </Grid>
    )
}

export default Loading;