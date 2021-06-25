import './App.css';
import { useContext, useEffect } from 'react';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import { Router, Route } from 'react-router-dom';
import Home from './Screens/Home';
import VideoChat from './Screens/VideoChat';
import TextChat from './Screens/TextChat';
import history from './history';
import { UserContext } from '../src/Context/AuthContext';
import CreateRoom from '../src/Screens/CreateRoom';
import JoinRoom from '../src/Screens/JoinRoom';
function App () {
    const { restore } = useContext(UserContext);
    useEffect(() => {
        restore();
    }, []);
    return (
        <Router history={history}>
            <div>
                <Route path="/" exact component={Signup} />
                <Route path="/Login" exact component={Login} />
                <Route path="/home" exact component={Home} />
                <Route path="/VideoChat" exact component={VideoChat} />
                <Route path="/TextChat" exact component={TextChat} />
                <Route path="/CreateRoom" exact component={CreateRoom} />
                <Route path="/JoinRoom" exact component={JoinRoom} />
            </div>
        </Router>
    );
}

export default App;
