import React from 'react';
import { Grid, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    msgLocal: {
        backgroundColor: '#4169e1',
        opacity: 0.7,
        padding: '1%',
        margin: '1%',
        borderRadius: '5px',
        width: '80%'
    }
});
const LocalMessage = () => {
    const classes = useStyles();
    return (
        <Grid item container direction="column" className={classes.msgLocal}>
            <Grid container item direction="row" justify="space-between">
                <Grid>Nishu Rai</Grid>

                <Grid> 08/07/21 6:00 pm</Grid>
            </Grid>

            <Divider />
            <Grid item container>
                ashajshagdydfwytweuwehswujhsnajnbxzxczxzvcxv
            </Grid>
        </Grid>
    );
};

export default LocalMessage;
