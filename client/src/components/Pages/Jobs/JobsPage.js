import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import JobCard from "../../Cards/JobCard";
import GetMoreButton from "../../Buttons/ButtonOutlined";
import MainNav from "../../NavBars/MainNav/MainNav";
import SelectInput from "../../Inputs/Select";
import SearchButton from "../../Buttons/ButtonContained";
import Loading from '../../../Utils/Loading';

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
  


const JobsPage = ({
    classes,
    handleSubmit,
    handleInputChange,
    getJobId ,
    formErrors,
    query,
    jobs,
    getMoreJobs,
    searchLen,
    categories,
    location,
    cities,
    loading
   }) => {
    return (
        <>
        <MainNav />
         <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <form onSubmit={handleSubmit}>
                <SelectInput
                  onChange={handleInputChange}
                  value={location}
                  error={formErrors.locationError}
                  elements={cities}
                  title="Locatie"
                  name="location"
                />

                <SelectInput
                  type="search"
                  title="Categorii"
                  onChange={handleInputChange}
                  value={query}
                  name="query"
                  elements={categories}
                  error={formErrors.searchError}
                />
                <SearchButton buttonText="Cauta" />
              </form>
            </Grid>
          </Grid> 
          {searchLen !== null ? <h2>Rezultat: {jobs.length}</h2> : null}
          <Grid container spacing={2}>
           {loading && <Loading/>}
            {jobs.length > 0 ? (
              <JobCard job={jobs} getJobId={getJobId} />
            ) : (
              <h2>Nu ma gasit nici un post de munca</h2>
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              {jobs.length >= 12 ? (
                <GetMoreButton onClick={getMoreJobs} buttonText="Mai Mult" />
              ) : null}
            </Grid>
          </Grid>
        </div>
    </>
    )
}

export default withStyles(styles)(JobsPage);