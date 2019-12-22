import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import JobCard from "../../Cards/JobCard";
import MainNav from "../../NavBars/MainNav/MainNav";
import Loading from "../../../Utils/Loading";
import SearchJobForm from "../../Forms/SearchJob";

const useStyles = makeStyles({
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
  handleSubmit,
  handleInputChange,
  getJobId,
  category,
  jobs,
  categories,
  location,
  cities,
  loading
}) => {
  const classes = useStyles();
  return (
    <>
      <MainNav />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <SearchJobForm
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              cities={cities}
              categories={categories}
              category={category}
              location={location}
            />
          </Grid>
        </Grid>
        {loading && <Loading />}
        <Grid container spacing={2}>
          {jobs.length > 0 ? (
            <JobCard job={jobs} getJobId={getJobId} />
          ) : (
            <h2>Nu ma gasit nici un post de munca</h2>
          )}
        </Grid>
      </div>
    </>
  );
};

export default JobsPage;
