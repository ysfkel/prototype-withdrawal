 
  
  const formItem = { 
    float: "left",
    display:'block',
    height: 70,
    margin:0
}

  export const style = theme => ({
      
    list: {
        ...formItem,
        with:50,
        backgroundColor:'grey',
        margin: theme.spacing(1),
        padding:0
    },
    button: {
    ...formItem,
      margin: theme.spacing(1),
    },  
    withdrawalItem : { 
        marginRight: theme.spacing(1),
      },

      widthdrawals: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        height: 400,
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: 'center'
      }
    

  })