import React, { useContext, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import IconCard from '../../Components/IconCard';
import './styles.css';
import history from '../../history';
import { UserContext } from '../../Context/AuthContext';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    one: {
        padding: '2%',
        fontSize: '40px',
        fontStyle: 'Lato',
        fontWeight: 'bold'
    },
    two: {
        fontSize: '30px',
        fontStyle: 'Lato'
    }
});
const Home = () => {
    const classes = useStyles();
    const { state, logout } = useContext(UserContext);
    useEffect(() => {
        if (!state.token) {
            history.push('/');
        }
    });
    const handleLogout = () => {
        logout();
    };
    return state.user ? (
        <div>
            <div style={{ textAlign: 'center' }}>
                <Typography className={classes.one}>Hello {state.user.displayName} !</Typography>
                <Typography className={classes.two}>Welcome to Microsoft Teams</Typography>
                <IconCard />
                <div onClick={handleLogout} style={{ textAlign: 'center' }}>
                    <Button size="small" variant="outlined" color="secondary">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    ) : null;
};

export default Home;
