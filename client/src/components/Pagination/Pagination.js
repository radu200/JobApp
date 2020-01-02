import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Pagination = ({
  prevPage,
  nextPage,
  handleNextPage,
  handlePrevPage,
  currentPage,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <ButtonGroup
          size="large"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={handlePrevPage}
            disabled={prevPage !== null ? false : true}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button>{currentPage}</Button>
          <Button
            onClick={handleNextPage}
            disabled={nextPage !== null ? false : true}
          >
            <ArrowForwardIosIcon />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

Pagination.propTypes = {
  handleNextPage: PropTypes.func,
  handlePrevPage: PropTypes.func,
  currentPage: PropTypes.number,
  prevPage: PropTypes.number,
  nextPage: PropTypes.number,
};
export default Pagination;
