import React from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from './SignUpForm/SignUpForm';

class SignUpPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Sign Up Page</h1>
                <Link to="/">Home</Link>
                <SignUpForm />
            </div>
        );
    }
}

export default SignUpPage;