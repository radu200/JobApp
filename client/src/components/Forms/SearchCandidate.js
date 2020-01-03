import React from "react";
import PropTypes from "prop-types";
import SelectInput from "./../Inputs/Select";
import SearchButton from "./../Buttons/ButtonContained";
import Slider from "./../Inputs/Slider";
import { Years } from "../../Utils/messages";
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
const SearchCandidate = ({
  handleSubmit,
  handleInputChange,
  category,
  categories,
  location,
  cities,
  experienceMax,
  handleExperienceValue,
  formErrors,
}) => {
  const classes = useStyles();
  console.log(formErrors)
  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <SelectInput
          onChange={handleInputChange}
          value={location}
          error={""}
          elements={cities}
          title="Locatie"
          name="location"
        />
        <p className={classes.error}>{formErrors.location}</p>

        <SelectInput
          onChange={handleInputChange}
          value={category}
          error={""}
          elements={categories}
          title="Categorie"
          name="category"
        />
        <p className={classes.error}>{formErrors.category}</p>

        <Slider
          min="0"
          max="50"
          value={experienceMax}
          onChange={handleExperienceValue}
          step="1"
          valueType={Years}
          title="Experienta"
        />
        <p className={classes.error}>{formErrors.experienceMax}</p>
        <SearchButton buttonText="Cauta" />
      </form>
    </>
  );
};

SearchCandidate.propTypes = {
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleExperienceValue: PropTypes.func,
  category: PropTypes.string,
  location: PropTypes.string,
  cities: PropTypes.array,
  categories: PropTypes.array,
  formErrors: PropTypes.object,
};
export default SearchCandidate;
