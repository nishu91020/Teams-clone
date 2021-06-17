import './App.css';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import { BrowserRouter, Route } from 'react-router-dom';
function App () {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Signup} />
                <Route path="/Login" component={Login} />
            </div>
        </BrowserRouter>
    );
}

export default App;
