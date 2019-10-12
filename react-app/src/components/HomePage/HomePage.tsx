import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Typescript Express React Starter App</h1>
                <h4>Home Page</h4>
                <div><Link to="/sign-up">Sign Up</Link></div>
                <div><Link to="/login">Login</Link></div>
            </div>
        );
    }
}

export default HomePage;