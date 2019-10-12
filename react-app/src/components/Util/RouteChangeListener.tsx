import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

// Useful for setting page titles and scrolling to top of page.
// If you need more control over setting other tags in the <head>, you could use a solution like 'react-helmet' instead.
class RouteChangeListener extends React.Component<Props> {
    componentDidMount() {
        this.setPageTitle();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
            this.setPageTitle();
        }
    }

    setPageTitle = () => {
        switch(this.props.location.pathname) {
            case '/':
                document.title = 'Home page';
                break;
            case '/sign-up':
                document.title = 'Sign up page';
                break;
            default:
                document.title = 'My app';
        }
    }

    render() {
        return null;
    }
}

export default withRouter(RouteChangeListener);