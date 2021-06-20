import React, { useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import IconCard from '../../Components/IconCard';
import './styles.css';
import { UserContext } from '../../Context/AuthContext';
import { AuthContext } from '../../Auth';
const Home = () => {
    const { state } = useContext(UserContext);
    useEffect(() => {
        console.log(`${state.user.displayName} !`);
    }, []);
    return (
        <div>
            <Header />
            <div style={{ margin: 'auto', width: '300px' }}>
                <h1>Hello {state.user.displayName} !</h1>
                <h3>Welcome to Microsoft Teams</h3>
                <IconCard />
            </div>
        </div>
    );
};

export default Home;
