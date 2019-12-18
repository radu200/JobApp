import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CandidateCard from "../../components/Cards/CandidateCard";
import GetMoreButton from "../../components/Buttons/ButtonOutlined";
import MainNav from "../../components/NavBars/MainNav/MainNav";
import SelectInput from "../../components/Inputs/Select";
import SearchButton from "../../components/Buttons/ButtonContained";
import Slider from "../../components/Inputs/Slider";
import { Years, NoCandFoundMsg } from "../../Utils/messages";
import { cities } from "../../api/cities";
import { categories } from "../../api/categories";
import { searchCandidate } from '../../api/users'
import { validate } from '../../Utils/validation'

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

class CandidatesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      offset: 0,
      category: "",
      location: "",
      experienceMax: 1,
      url: "",
      formErrors: {
        categoryError: "",
        locationError: ""
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExperienceValue = this.handleExperienceValue.bind(this);
  }

  async componentDidMount() {
    let location, category, experienceMax, offset;

    try {
      const data = await searchCandidate( 
         location = "Chisinau",
         category = "Frumusete si Bunastare", 
         experienceMax = 10,
         offset = 0
         );


        this.setState({
          candidates: [...data.candidates],
          offset: offset + 12
        });
      
    } catch (error) {
      console.error(error);
    }
  }

  getMoreCandidates = async () => {
    const { offset, candidates, location, category, experienceMax} = this.state;
    try {
       const data = await searchCandidate( 
        location,
        category,
        experienceMax ,
        offset,
        );

       
      this.setState({
        candidates: [...candidates, ...data.candidates],
        offset: offset + 12
      });
    } catch (error) {
      console.error(error);
    }
  };


  handleExperienceValue(event) {
    this.setState({ experienceMax: event.target.value });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    // const isValid = this.validate();
    const { location, category, experienceMax } = this.state;
    const locationVal = validate(location )
    const categoryVal = validate(category)
  
  
    if (categoryVal.status && locationVal.status) {
      let offset
      try {
       const data =  await searchCandidate(
         location,
         category,
         experienceMax,
         offset = 0);
      
          this.setState({
            candidates: [...data.candidates],
            offset: offset + 12
          });
        
      } catch (error) {
        console.error(error);
      }
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          locationError: "",
          categoryError: ""
        }
      }));

   
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          locationError: locationVal.error,
          categoryError: categoryVal.error
        }
      }));
    }
  }

  render() {
    const { classes } = this.props;
    const {
      category,
      experienceMax,
      candidates,
      location,
      formErrors,
    } = this.state;
    const {
      handleSubmit,
      handleInputChange,
      handleExperienceValue,
      getMoreCandidates
    } = this;
    return (
      <div>
        <MainNav />
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
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
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <Slider
                        min="0"
                        max="50"
                        value={experienceMax}
                        onChange={handleExperienceValue}
                        step="1"
                        valueType={Years}
                        title="Experienta"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <SearchButton buttonText="Cauta" />
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {candidates.length > 0 ? (
                  <CandidateCard candidate={candidates} />
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
      </div>
    );
  }
}

export default withStyles(styles)(CandidatesPage);
