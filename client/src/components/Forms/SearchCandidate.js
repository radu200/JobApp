import React from "react";
import PropTypes from 'prop-types'
import SelectInput from "./../Inputs/Select";
import SearchButton from "./../Buttons/ButtonContained";
import Slider from "./../Inputs/Slider";
import { Years, } from "../../Utils/messages";

const SearchCandidate = ({
    handleSubmit,
    handleInputChange,
    category,
    categories,
    location,
    cities,
    formErrors,
    experienceMax,
    handleExperienceValue,
}) => {
  return (
    <>
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
          onChange={handleInputChange}
          value={category}
          error={formErrors.categoryError}
          elements={categories}
          title="Categorie"
          name="category"
        />

        <Slider
          min="0"
          max="50"
          value={experienceMax}
          onChange={handleExperienceValue}
          step="1"
          valueType={Years}
          title="Experienta"
        />
        <SearchButton buttonText="Cauta" />
      </form>
    </>
  );
};

SearchCandidate.propTypes = {
    handleInputChange:PropTypes.func,
    handleSubmit:PropTypes.func,
    handleExperienceValue:PropTypes.func,
    category:PropTypes.string,
    location:PropTypes.string,
    cities:PropTypes.array,
    categories:PropTypes.array,
    formErrors:PropTypes.object
}
export default SearchCandidate;
