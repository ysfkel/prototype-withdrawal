import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    
  },
  container: {
      backgroundColor: 'grey'
  }
});
 
const WithdrawalItemsList = ({withdrawal, denomination}) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container} >
      <Table className={classes.table} aria-label="caption table">
        <caption>Total ({denomination}): {withdrawal.total}</caption>
        <TableHead>
          <TableRow>
            <TableCell>Denomination </TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Total&nbsp;(g)</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
                {withdrawal.items.map((x,i) => ( 

                    <TableRow key={i} data={x}>
                    <TableCell component="th" scope="row">
                        {x.denomination}
                    </TableCell>
                    <TableCell align="right">
                        {x.amount}
                    </TableCell> 
                    <TableCell align="right">
                        {x.denomination*x.amount}
                    </TableCell>
                    </TableRow>
                ) )} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default WithdrawalItemsList
