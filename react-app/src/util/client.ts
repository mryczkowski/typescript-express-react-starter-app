import { ReqError } from "../typings/request";

// Parses and formats err object
export function parseErr(err): Promise<ReqError> {
    const result: ReqError = { message: 'Something went wrong :( Please try again' };

    if (err.response) {
        if (typeof(err.response.data) !== 'string' && err.response.data.validationErrors) {
            // map validation errors to format of [param]: "errMsg". This makes it easier to map
            // server-side validation errors to form fields in components
            err.response.data.validationErrors.forEach(err => {
                if (!result.validationErrors) {
                    result.validationErrors = {};
                }

                result.validationErrors[err.param] = err.msg;
            });
        }

        result.message = err.response.data.message || '';
    } else if (err.request) {
        result.message = 'No response was received';
    }
    else if (err.message) {
        result.message = err.message;
    }

    return Promise.reject(result);
}