import React, { useContext, useEffect } from 'react';

import IconCard from '../../Components/IconCard';
import './styles.css';
import history from '../../history';
import { UserContext } from '../../Context/AuthContext';
import Button from '@material-ui/core/Button';
const Home = () => {
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
                <h1>Hello {state.user.displayName} !</h1>
                <h3>Welcome to Microsoft Teams</h3>
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
