import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import Button from "../../Buttons/ButtonContained";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
    marginLeft: 10,
    marginRight: 10
  }
}));

export default function Users({ reports, blackListBtn, getMore, handleBlock }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Num</TableCell>
            <TableCell>Date Join</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Reporter Account</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report, i) => (
            <TableRow key={report.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                {report.first_name} {report.last_name}
              </TableCell>
              <TableCell>{report.email}</TableCell>
              <TableCell>
                {report.type === "employer" ? (
                  <Link
                    to={`/api/company/${report.id}`}
                    rel="noreferrer"
                    target={"_blank"}
                  >
                    {" "}
                    {report.first_name}
                  </Link>
                ) : report.type === "jobseeker" ? (
                  <Link
                    to={`/candidate-details/${report.id}`}
                    rel="noreferrer"
                    target={"_blank"}
                  >
                    {" "}
                    {report.first_name}
                  </Link>
                ) : null}
              </TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>
                {blackListBtn ? (
                  <Button
                    buttonText="Block"
                    color="secondary"
                    onClick={e =>
                      handleBlock(report.reported_user_id, report.id)
                    }
                  />
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Button buttonText="More" onClick={getMore} />
      </div>
    </React.Fragment>
  );
}
