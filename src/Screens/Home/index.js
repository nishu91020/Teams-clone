import React from 'react';
import Header from '../../Components/Header';
import IconCard from '../../Components/IconCard';
import './styles.css';
const Home = () => {
    return (
        <div className="HomeContainer">
            <Header />
            <div className="headone">
                <div>
                    <h2>Hey Username!</h2>
                </div>
                Welcome to Microsoft Teams
            </div>
            <IconCard />
        </div>
    );
};

export default Home;
