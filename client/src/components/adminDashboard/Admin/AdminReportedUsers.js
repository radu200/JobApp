import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AdminNav from "../NavBar/AdminNav";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Users from "../Charts/ReportedUsersChart";
import TextInput from "../../Inputs/TextInput";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    marginTop: 100,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto"
  }
}));

const AdminReported = ({
  blackListBtn,
  reports,
  getMore,
  handleBlock,
  onChange,
  value,
  msg
}) => {
  const classes = useStyles();

  return (
    <>
      <AdminNav />
      <div className={classes.root}>
        <h2>{msg}</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <TextInput
              onChange={onChange}
              value={value}
              title="Search by email"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper container spacing={2}>
              <Users
                reports={reports}
                blackListBtn={blackListBtn}
                getMore={getMore}
                handleBlock={handleBlock}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AdminReported;
