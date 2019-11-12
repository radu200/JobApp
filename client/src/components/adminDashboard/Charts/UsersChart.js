/* eslint-disable no-script-url */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import  Button from '../../Buttons/ButtonContained'


const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
    marginLeft:10,
    marginRight:10
  },
}));

export default function Users({users, blackListBtn, getMore, handleBlock, unBlockBtn, handleUnBlock}) {
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
            <TableCell>Link To Account</TableCell>
            <TableCell>Type</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, i) => (
            <TableRow key={user.id}>
              <TableCell>{i+1}</TableCell>                
              <TableCell>{user.date_registered}</TableCell>
              <TableCell>{user.first_name} {user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                  {user.type === 'employer' ? 
                  <Link to={`/api/company/${user.id}`} rel="noreferrer" target={"_blank"}> {user.first_name}</Link>
                  : user.type === 'jobseeker' ? 
                  <Link to={`/candidate-details/${user.id}` }  rel="noreferrer" target={"_blank"}> {user.first_name}</Link> : null}
             </TableCell>
              <TableCell >{user.type}</TableCell>
                <TableCell>
                  {blackListBtn === 'true' ?  <Button buttonText='Block' color="secondary" handleBlock={ e => handleBlock(user.id)}/> : ''}
                  {unBlockBtn === 'true' ?  <Button buttonText='UnBlock' color="secondary" handleUnBlock={ e => handleBlock(user.id)}/> : ''}

                </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
          <Button buttonText='More' onClick={getMore} />
      </div>
    </React.Fragment>
  );
}