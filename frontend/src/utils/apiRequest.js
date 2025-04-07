import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true, 
});

export const sendOtp = (email) => api.post('/auth/send-otp', { email });
export const verifyOtp = (email, otp) => api.post('/auth/verify-otp', { email, otp });
export const register = (token, formData) =>
  api.post('/auth/register', formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const login = (email, password) => api.post('/auth/login', { email, password });

export default api;