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
export const companyRegister = (name, role, stipend, location, lastDate) => api.post('/company/register', { name, role, stipend, location, lastDate });
export const getCompanyDetails = () => api.get('/company/get-details');
export const exportFilteredStudents = (filters, fields) => {
  const token = localStorage.getItem('loginToken');  

  if (!token) {
    throw new Error('No token found, please login first!');
  }

  return api.post('/excel/export', { filters, fields }, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
export const getStudentDetails = () => api.get('/auth/details', {withCredentials: true});

export default api;