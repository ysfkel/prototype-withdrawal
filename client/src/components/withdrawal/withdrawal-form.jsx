import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      color: 'white',
      backgroundColor:'white'

    },
    text:{
      color: 'white',
      backgroundColor:'white'
    }
  },
}));

export default function WithdrawalForm(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <TextField InputProps={{
        className:classes.text
      }}  
       label="Amount" variant="outlined" onChange={props.handleChange}/>
    </div>
  );
}
