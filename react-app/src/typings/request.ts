export type ReqStatus = '' | 'pending' | 'success' | 'error';
export type ReqError = {
    message: string,
    validationErrors?: {
        [key: string]: string,
    },
}