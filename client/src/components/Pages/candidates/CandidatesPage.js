import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CandidateCard from "../../Cards/CandidateCard";
import GetMoreButton from "../../Buttons/ButtonOutlined";
import MainNav from "../../NavBars/MainNav/MainNav";
import { NoCandFoundMsg } from "../../../Utils/messages";
import SearchCandidateForm from "../../Forms/SearchCandidate";

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

const CandidatesPage = ({
    handleSubmit,
    handleInputChange,
    category,
    categories,
    location,
    cities,
    formErrors,
    experienceMax,
    handleExperienceValue,
    candidates,
    getMoreCandidates,
    handleCandidateDetails
}) => {
  const classes = useStyles();
  return (
    <>
      <MainNav />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <SearchCandidateForm
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              category={category}
              location={location}
              categories={categories}
              cities={cities}
              formErrors={formErrors}
              handleExperienceValue={handleExperienceValue}
              experienceMax={experienceMax}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            {candidates.length > 0 ? (
              <CandidateCard 
                candidate={candidates} 
                handleCandidateDetails={handleCandidateDetails}
                />
            ) : (
              <h1>{NoCandFoundMsg}</h1>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            {candidates.length >= 12 ? (
              <GetMoreButton onClick={getMoreCandidates} />
            ) : null}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

CandidatesPage.propTypes = {
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleExperienceValue: PropTypes.func,
  getMoreCandidates: PropTypes.func,
  category: PropTypes.string,
  location: PropTypes.string,
  cities: PropTypes.array,
  categories: PropTypes.array,
  candidates: PropTypes.array,
  formErrors: PropTypes.object
};
export default CandidatesPage;
