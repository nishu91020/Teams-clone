import './App.css';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import { Router, Route } from 'react-router-dom';
import Home from './Screens/Home';
import VideoChat from './Screens/VideoChat';
import TextChat from './Screens/TextChat';
import history from './history';
function App () {
    return (
        <Router history={history}>
            <div>
                <Route path="/" exact component={Signup} />
                <Route path="/Login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/VideoChat" component={VideoChat} />
                <Route path="/TextChat" component={TextChat} />
            </div>
        </Router>
    );
}

export default App;
