import './App.css';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from './Auth';
import Home from './Screens/Home';
import VideoChat from './Screens/VideoChat';
import TextChat from './Screens/TextChat';
function App () {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Signup} />
                    <Route path="/Login" component={Login} />
                    <Route path="/home" component={Home} />
                    <Route path="/VideoChat" component={VideoChat} />
                    <Route path="/TextChat" component={TextChat} />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
