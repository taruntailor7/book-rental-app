import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getBooksAPI = () => api.get('/books');
export const getBookAPI = (id: number) => api.get(`/books/${id}`);
export const getRentalsAPI = (userId: number) => api.get(`/rentals/user/${userId}`);
export const rentBookAPI = (data: any) => api.post('/rentals', data);
export const getUserAPI = (id: number) => api.get(`/users/${id}`);
export const signUpAPI = (data: any) => api.post('/auth/signup', data);
export const signInAPI = (data: any) => api.post('/auth/signin', data);

export default api;