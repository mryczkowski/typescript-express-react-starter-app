export function makeAction<T extends string, P = undefined>(type: T, payload?: P): { type: T, payload: P } {
    return {
        type,
        payload: payload as P,
    };
};