import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { NoJobFoundMsg } from "../../Utils/messages";
import JobCard from "../../components/Cards/JobCard";
import GetMoreButton from "../../components/Buttons/ButtonOutlined";
import MainNav from "../../components/NavBars/MainNav/MainNav";
import SelectInput from "../../components/Inputs/Select";
import SearchButton from "../../components/Buttons/ButtonContained";
import { cities } from "../../api/cities";
import { getJobs, searchJobs, getMoreJobs } from "../../api/jobs";
import { validate } from "../../Utils/validation";
import { categories } from "../../api/categories";

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

class JobsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      offset: 0,
      query: "",
      location: "",
      searchLen: null,
      url: "",
      formErrors: {
        searchError: "",
        locationError: ""
      },
      error: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    const { offset } = this.state;
    const url = `/api/jobs?offset=${offset}`;
    try {
      const data = await getJobs(offset);

      this.setState({
        jobs: data.jobs,
        url,
        offset: offset + 12
      });
    } catch (error) {
      console.error(error);
    }
  }

  getMoreJobs = async () => {
    const { url, offset, jobs } = this.state;

    try {
      const data = await getMoreJobs(url, offset);
      this.setState({
        jobs: [...jobs, ...data.jobs],
        offset: offset + 12

      });
    } catch (error) {
      console.error(error);
    }
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  //submit form
  async handleSubmit(event) {
    event.preventDefault();

    const { query, location } = this.state;
    const queryVal = validate(query);
    const locationVal = validate(location);

    if (queryVal.status && locationVal.status) {
      const url = `/api/search/job?search_query=${this.state.query}&location=${this.state.location}`;

      try {
        const offset = 0;
        const data = await searchJobs(query, location, offset);
        const searchLen = data.jobs.length;
        this.setState({
          jobs: [...data.jobs],
          url,
          offset: offset + 12,
          searchLen
        });

        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            locationError: "",
            searchError: ""
          }
        }));
      } catch (error) {
        console.error(error);
      }
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          locationError: locationVal.error,
          searchError: queryVal.error
        }
      }));
    }
  }

  render() {
    const { classes } = this.props;
    const { query, formErrors, location, jobs, searchLen} = this.state;
    const { handleSubmit, handleInputChange, getMoreJobs } = this;
    return (
      <div>
        <MainNav />
        
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
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
                  type="search"
                  title="Categorii"
                  onChange={handleInputChange}
                  value={query}
                  name="query"
                  elements={categories}
                  error={formErrors.searchError}
                />
                <SearchButton buttonText="Cauta" />
              </form>
            </Grid>
          </Grid>
          {searchLen !== null ? <h2>Rezultat: {jobs.length}</h2> : null}
          <Grid container spacing={2}>
            {jobs.length > 0 ? (
              <JobCard job={jobs} />
            ) : (
              <h2>{NoJobFoundMsg}</h2>
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              {jobs.length >= 12 ? (
                <GetMoreButton onClick={getMoreJobs} buttonText="Mai Mult" />
              ) : null}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(JobsPage);
