
import React from 'react'
import { withdraw, getAccountBalance } from '../../services/service'
import WithdrawalItemsList from './list'
import Button from '@material-ui/core/Button';
import WithdrawalForm from './withdrawal-form'
import {  withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { style } from './style'

const ComponentState = {
    withdrawalAmount: 0,
    withdrawal: {
       notes: {
           items: [],
           total:0
       },
       largeCoins: {
        items: [],
        total:0
    },
       smallCoins: {
        items: [],
        total:0
    },
     grandTotal:0,
     accountBalance: 0,
     insufficientBalance: false
    },
    accountBalance: 0
};

 class Withdrawal extends React.Component {

    constructor(props) {
      super(props);
      this.state = ComponentState
      this.handleChange = this.handleWithdrawal.bind(this);
    }

    componentWillMount = async () => {
          try {
            let accountBalanceResult = await getAccountBalance()

            const accountBalance = accountBalanceResult.data.accountBalance

            this.setState({accountBalance:accountBalance})

          }catch(e) {
            console.log(e)
          }
    }
  

    handleWithdrawal = async (event) => {
           this.setState(
               {withdrawalAmount: event.target.value}
           )
    }
 
    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const withdrawalResponse = await withdraw(this.state.withdrawalAmount)
            const withdrawal = withdrawalResponse.data
            this.setState({...this.state, withdrawal: withdrawal,
              accountBalance: withdrawal.accountBalance
            })
        }catch(e) {
            console.log(e)
        }
    }

    isRender = (data) => {

        if(!!data && !!data.items && !!data.items.length > 0) return true 

        return false

    }
  
    render() {

     const { classes } = this.props;

      return (
        <>
          <span>ENTER WITHDRAWAL AMOUNT</span>
          <span>Account Balance {this.state.accountBalance}</span>
          <span>Withdrawal Amount:  {this.state.withdrawalAmount}</span>
         
          <form  noValidate autoComplete="off">
             <div className={classes.list } ><WithdrawalForm handleChange={this.handleChange}/></div>
             <Button  className={classes.button} value="submit"  onClick={this.handleSubmit}  variant="contained" color="secondary">
            Withdraw
            </Button>
          </form>
     
          <div className={classes.widthdrawals}>

                {this.isRender(this.state.withdrawal.notes) == true && 
                  <div className={classes.withdrawalItem}>
                      <WithdrawalItemsList denomination="Notes" withdrawal={this.state.withdrawal.notes}/>
                  </div>
                }

                {this.isRender(this.state.withdrawal.largeCoins) == true  && 
                    <div className={classes.withdrawalItem}>
                        <WithdrawalItemsList denomination="Large coins"  withdrawal={this.state.withdrawal.largeCoins}/>
                    </div>
                }  
               {this.isRender(this.state.withdrawal.smallCoins) == true  && 
                <div className={classes.withdrawalItem}>
                    <WithdrawalItemsList denomination="Small coins" withdrawal={this.state.withdrawal.smallCoins}/>
                </div> 
                }
                {this.state.withdrawal.insufficientBalance && 
                   
                    <h2>You do no have sufficient balance to make this transaction</h2>

                }
          </div>
        </>
      );
    }
  }  



  Withdrawal.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(style)(Withdrawal);


