import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CandidateCard from "../../Cards/CandidateCard";
import GetMoreButton from "../../Buttons/ButtonOutlined";
import MainNav from "../../NavBars/MainNav/MainNav";
import { NoCandFoundMsg } from "../../../Utils/messages";
import SearchCandidateForm from "../../Forms/SearchCandidate";

import CandidateDetailsCard from "../../Cards/CandidateDetailsCard"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    // display:'flex',
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
    handleCandidateDetails,
    candidateDetails,
    experience,
    
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
              <CandidateCard 
                candidate={candidates} 
                handleCandidateDetails={handleCandidateDetails}
                />

            {candidates.length >= 12 ? (
              <GetMoreButton onClick={getMoreCandidates} />
            ) : null}
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <CandidateDetailsCard 
                candidate = {candidateDetails}
                experience = {experience}
              />
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
