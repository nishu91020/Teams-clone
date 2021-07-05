import './App.css';
import { useContext, useEffect } from 'react';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './Screens/Home';
import history from './history';
import { UserContext } from '../src/Context/AuthContext';
import CreateRoom from '../src/Screens/CreateRoom';
import JoinRoom from '../src/Screens/JoinRoom';
import Header from './Components/Header';
import VideoScreen from '../src/Screens/VideoScreen';
import { CircularProgress } from '@material-ui/core';

function App () {
    const { restore, isLoading, state } = useContext(UserContext);
    useEffect(() => {
        const tokenRestore = async () => {
            await restore();
        };
        tokenRestore();
    }, []);
    if (isLoading) {
        return (
            <div className="loader">
                <CircularProgress thickness={5} />
            </div>
        );
    }
    else {
        return (
            <Router history={history}>
                <div>
                    <Header />

                    {!state.token ? (
                        <Switch>
                            <Route path="/" exact component={Signup} />
                            <Route path="/Login" exact component={Login} />
                        </Switch>
                    ) : (
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/CreateRoom/:id" exact component={CreateRoom} />
                            <Route path="/JoinRoom" exact component={JoinRoom} />
                            <Route path="/VideoScreen/:id" exact component={VideoScreen} />
                        </Switch>
                    )}
                </div>
            </Router>
        );
    }
}

export default App;
