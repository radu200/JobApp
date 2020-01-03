import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import CandidateCard from "../../Cards/CandidateCard";
import MainNav from "../../NavBars/MainNav/MainNav";
import CandidateDetailsD from "../../Cards/CandidateDetailsD";
import CandidateDetailsM from "../../Cards/CandidateDetailsM";
import ApplicantNav from '../../NavBars/Employer/ApplicantsNavBar'

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

const ApplicantsPage = ({
  candidates,
  getMoreCandidates,
  handleCandidateDetails,
  candidateDetails,
  experience,
  loadingCl,
  loadingCd,
  disable,
  jobId,
  shortList,
  reject
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
  const matchespx = useMediaQuery("(max-width:960px)");
  return (
    <>
      <MainNav />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <ApplicantNav jobId={jobId} />
            {candidates.length === 0 &&  <h2>Aici vor aparea aplicantii</h2>}
            <CandidateCard
              handleOpen={handleOpen}
              candidates={candidates}
              handleCandidateDetails={handleCandidateDetails}
              loading={loadingCl}
              getMoreCandidates={getMoreCandidates}
              disable={disable}
              shortList={shortList}
              reject={reject}
            />
          </Grid>
          {matchespx ? (
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
                open={open}

                />
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

ApplicantsPage.propTypes = {
  getMoreCandidates: PropTypes.func,
  candidates: PropTypes.array,
};
export default ApplicantsPage;
