// Temp ids are always negative
export function getTempId() {
    return new Date().valueOf() * -1;
}