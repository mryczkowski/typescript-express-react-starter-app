import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { login } from '../../../state/user/userAsyncActions';
import { AppState } from '../../../state/appReducer';

const mapStateToProps = (state: AppState) => ({
    loginReqStatus: state.user.loginReqStatus,
    loggedIn: state.user.loggedIn,
    validationErrors: state.user.error.validationErrors || {},
    errorMessage: state.user.error.message,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ login }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);