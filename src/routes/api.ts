import express from 'express';
import { isAuthenticated } from '../config/auth';
import { checkValidationErrs } from '../validation/helper';
import * as UserValidator from '../validation/User';
import * as UserCtrl from '../controllers/User';

const apiRouter = express.Router();
apiRouter
    .post('/users', UserValidator.registerUser, checkValidationErrs, UserCtrl.registerUser)

    // Authenticated routes
    .use(isAuthenticated())

    .get('/users/me', UserCtrl.getCurrentUser)
;

export default apiRouter;
