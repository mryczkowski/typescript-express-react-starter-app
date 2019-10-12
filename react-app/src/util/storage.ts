export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    let cookie: string | undefined = '';

    if (parts.length === 2) {
        const part1 = parts.pop();
        if (part1) {
            cookie = part1.split(";").shift();
        }
    }

    return cookie;
}

export function deleteCookie(name: string) {
    let cookieStr = name + '=; Path=/; Max-Age=-99999999;';
    if (process.env.NODE_ENV === 'production') {
        cookieStr += ' Domain=fundraiserforge.com;';
    }

    document.cookie = cookieStr;
}