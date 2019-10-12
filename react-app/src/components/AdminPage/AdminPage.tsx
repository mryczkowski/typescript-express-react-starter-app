import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect, Route, Link, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { logout, getCurrentUser } from '../../state/user/userAsyncActions'
import { AppState } from '../../state/appReducer';

interface Props extends RouteComponentProps {
    loggedIn: boolean;
    logout: typeof logout;
    getCurrentUser: typeof getCurrentUser;
}

class AdminPage extends React.Component<Props> {
    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.getCurrentUser();

            // do something with user data now that we can access it
        }
    }

    renderAdminHome = () => {
        return (
            <React.Fragment>
                <h1>Admin Page</h1>
                <Link to="/">Home</Link>
                <div>You are now logged in</div>
                <button onClick={this.props.logout}>Logout</button>
            </React.Fragment>
        );
    }

    render() {
        const currUrl = this.props.match.url;

        return (
            <div>
                <Switch>
                    {!this.props.loggedIn &&
                        <Redirect to="/login" />
                    }
                    <Route path={currUrl} exact render={this.renderAdminHome} />

                    {/* Add admin routes here */}

                    <Redirect from="*" to={currUrl} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ logout, getCurrentUser }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);