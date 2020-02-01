import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './SignUpForm.module.css'
import { ReqStatus } from '../../../typings/request';
import { minPasswordLength } from '../../../util/user';
import { AppState } from '../../../state/appReducer';
import { registerUser } from '../../../state/user/userActions';

interface Props {
    signUpReqStatus: ReqStatus;
    validationErrors: any;
    registerUser(email: string, password: string): Promise<void>;
}

interface State {
    email: string;
    password: string;
    confirmPassword: string;
    errors: {
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
}

class SignUpForm extends React.Component<Props, State> {
    static defaultProps = {
        validationErrors: {},
    }

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    }

    componentDidUpdate(prevProps) {
        if (this.props.validationErrors !== prevProps.validationErrors) {
            this.setState(state => ({ 
                errors: {
                    ...state.errors,
                    ...this.props.validationErrors,
                },
            }));
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    onConfirmPasswordChange = (e) => {
        this.setState({ confirmPassword: e.target.value });
    }

    validate = () => {
        const errors = {
            email: this.state.email.length === 0 ? 'Please enter an email' : '',
            password: this.state.password.length < minPasswordLength ? `Password must be at least ${minPasswordLength} characters` : '',
            confirmPassword: this.state.confirmPassword !== this.state.password ? 'Passwords do not match' : '',
        };
        
        this.setState({ errors });
        
        const hasErr = Object.values(errors).some(err => err.length > 0);
        return !hasErr;
    }

    onSignUp = (e) => {
        e.preventDefault();
        const isValid = this.validate();

        if (isValid) {
            this.props.registerUser(this.state.email, this.state.password);
        }
    }

    onGoogleSignIn = () => {
        if (process.env.NODE_ENV === 'development') {
            // Because we are using a proxy in development
            window.location.href = "http://localhost:3001/auth/google";
        }
        else {
            window.location.href = '/auth/google';
        }
    }

    render() {
        if (this.props.signUpReqStatus === 'success') {
            return (
                <React.Fragment>
                    <div>Sign Up Successful!</div>
                    <Link to="/login">Login</Link>
                </React.Fragment>
            );
        }

        return (
            <form noValidate onSubmit={this.onSignUp}>
                {/* To test google sign in you must have the right variables set in your .env, then uncomment the google strategy in src/config/passport.ts */}
                {/* <button type="button" onClick={this.onGoogleSignIn}>Sign In With Google</button> */}

                <div className={styles.label}>Email:</div>
                <input type="email" value={this.state.email} onChange={this.onEmailChange} />
                <div className={styles.error}>{this.state.errors.email}</div>

                <div className={styles.label}>Password:</div>
                <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
                <div className={styles.error}>{this.state.errors.password}</div>

                <div className={styles.label}>Confirm Password:</div>
                <input type="password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange} />
                <div className={styles.error}>{this.state.errors.confirmPassword}</div>

                <div>
                    <button type="submit" disabled={this.props.signUpReqStatus === 'pending'}>Sign Up</button>
                </div>
            </form>  
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    signUpReqStatus: state.user.signUpReqStatus,
    validationErrors: state.user.error.validationErrors,
});

const mapDispatchToProps = {
    registerUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);