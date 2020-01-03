import React from "react";
import PropTypes from "prop-types";
import SelectInput from "./../Inputs/Select";
import SearchButton from "./../Buttons/ButtonContained";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    background: "white",
    padding: "10px",
  },
  error: {
    color: "red",
  },
});
const SearchJob = ({
  handleSubmit,
  handleInputChange,
  category,
  categories,
  location,
  cities,
  formErrors,
}) => {
  const classes = useStyles();
  return (
    <>
      <form
        className={classes.root}
        onSubmit={handleSubmit}
        data-test="jobs-form"
      >
        <SelectInput
          onChange={handleInputChange}
          value={location}
          elements={cities}
          title="Locatie"
          name="location"
          dataTest="location"
        />
        <p className={classes.error}>{formErrors.location}</p>
        <SelectInput
          type="search"
          title="Categorii"
          onChange={handleInputChange}
          value={category}
          name="category"
          elements={categories}
          dataTest="category"
        />
        <p className={classes.error}>{formErrors.category}</p>
        <SearchButton data-test="submit-jobs" buttonText="Cauta" />
      </form>
    </>
  );
};

SearchButton.propTypes = {
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  category: PropTypes.string,
  location: PropTypes.string,
  cities: PropTypes.array,
  categories: PropTypes.array,
};
export default SearchJob;
