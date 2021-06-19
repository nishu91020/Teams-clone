import './App.css';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from './Auth';
import Home from './Screens/Home';
function App () {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Signup} />
                    <Route path="/Login" component={Login} />
                    <Route path="/home" component={Home} />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
