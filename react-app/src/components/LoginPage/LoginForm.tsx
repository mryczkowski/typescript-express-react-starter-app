import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ReqStatus } from '../../typings/request';
import { login } from '../../state/user/userActions';
import { AppState } from '../../state/appReducer';

interface Props {
    loginReqStatus: ReqStatus;
    loggedIn: boolean;
    validationErrors: {
        username?: string;
        password?: string;
    };
    errorMessage: string;
    login(email: string, password: string): Promise<void>;
}

interface State {
    email: string;
    password: string;
    redirectToAdmin: boolean;
    showErr: boolean;
}

class LoginForm extends React.Component<Props, State> {
    state = {
        email: '',
        password: '',
        redirectToAdmin: false,
        showErr: false,
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loginReqStatus === 'pending' && this.props.loginReqStatus === 'error') {
            this.setState({ showErr: true });
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    onLogin = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/admin" />;
        }

        return (
            <form noValidate onSubmit={this.onLogin}>
                <div>Email:</div>
                <input type="email" value={this.state.email} onChange={this.onEmailChange} />
                {this.state.showErr &&
                    <div>{this.props.validationErrors.username}</div>
                }

                <div>Password:</div>
                <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
                {this.state.showErr &&
                    <div>{this.props.validationErrors.password}</div>
                }

                <div>
                    <button type="submit" disabled={this.props.loginReqStatus === 'pending'}>Login</button>
                </div>

                {this.state.showErr &&
                    <div>{this.props.errorMessage}</div>
                }
            </form>  
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    loginReqStatus: state.user.loginReqStatus,
    loggedIn: state.user.loggedIn,
    validationErrors: state.user.error.validationErrors || {},
    errorMessage: state.user.error.message,
});

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);