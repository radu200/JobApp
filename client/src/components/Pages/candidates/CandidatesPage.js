import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CandidateCard from "../../Cards/CandidateCard";
import MainNav from "../../NavBars/MainNav/MainNav";
import SearchCandidateForm from "../../Forms/SearchCandidate";
import CandidateDetailsD from "../../Cards/CandidateDetailsD";
import CandidateDetailsM from "../../Cards/CandidateDetailsM";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
  },
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
  loadingCl,
  loadingCd,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  //open and close for candidate details
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const matches768 = useMediaQuery("(max-width:768px)");

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
              handleOpen={handleOpen}
              candidate={candidates}
              handleCandidateDetails={handleCandidateDetails}
              loading={loadingCl}
              getMoreCandidates={getMoreCandidates}
            />
          </Grid>
          {matches768 ? (
            <CandidateDetailsM
              candidate={candidateDetails}
              experience={experience}
              handleClose={handleClose}
              open={open}
            />
          ) : (
            <Grid item xs={12} sm={12} md={6}>
              <CandidateDetailsD
                candidate={candidateDetails}
                experience={experience}
                handleClose={handleClose}
                loading={loadingCd}
              />
            </Grid>
          )}
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
  formErrors: PropTypes.object,
};
export default CandidatesPage;
