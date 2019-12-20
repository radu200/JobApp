import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }))


const Pagination = ({
    prevPage, 
    nextPage,
    handleNextPage,
    handlePrevPage,
    currentPage, 
 }) => {
    
    const classes = useStyles();


   return(
        <>
            <div className={classes.root}>
            <ButtonGroup  size="large" color="primary" aria-label="outlined primary button group">
                <Button onClick={handlePrevPage}  disabled={prevPage !== null ? false : true} ><ArrowBackIosIcon/></Button>
                <Button>{currentPage}</Button>
                <Button onClick={handleNextPage}    disabled={nextPage !== null ? false : true} ><ArrowForwardIosIcon/></Button>
            </ButtonGroup>
        </div>
        </>
   )
}


Pagination.propTypes = {
    handleNextPage:PropTypes.func,
    handlePrevPage:PropTypes.func,
    currentPage:PropTypes.number,
    prevPage:PropTypes.number,
    nextPage:PropTypes.number,
}
export default Pagination