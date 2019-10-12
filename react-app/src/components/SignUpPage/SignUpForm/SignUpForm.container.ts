import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import { registerUser } from '../../../state/user/userAsyncActions';
import { AppState } from '../../../state/appReducer';

const mapStateToProps = (state: AppState) => ({
    signUpReqStatus: state.user.signUpReqStatus,
    validationErrors: state.user.error.validationErrors,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ registerUser }, dispatch)
); 

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);