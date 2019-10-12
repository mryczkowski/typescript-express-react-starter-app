import axios from 'axios';

export async function registerUser(email: string, password: string) {
    const res = await axios.post('/api/users', { email, password });
    return res.data.user;
}

export async function getCurrentUser() {
    const res = await axios.get('/api/users/me');
    return res.data;
}

export async function login(email: string, password: string) {
    return axios.post('/auth/local', { username: email, password });
}

export async function logout() {
    return axios.post('/auth/logout');
}