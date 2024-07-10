import { User } from '../types';
import { mapToUser } from '../utils';
import apiClient from './apiClient';

const login = async (email: string, password: string): Promise<User> => {
  const response = await apiClient.post('/auth/login', { email, password });
  return mapToUser(response.data);
};

const register = async (
  email: string,
  password: string,
  dob: string
): Promise<User> => {
  const response = await apiClient.post('/auth/register', {
    email,
    password,
    dob,
  });
  return mapToUser(response.data);
};

const ownerLogin = async (email: string, password: string): Promise<User> => {
  const response = await apiClient.post('/auth/owner-login', {
    email,
    password,
  });
  return mapToUser(response.data);
};

const ownerRegister = async (
  email: string,
  password: string,
  dob: string
): Promise<User> => {
  const response = await apiClient.post('/auth/owner-register', {
    email,
    password,
    dob,
  });
  return mapToUser(response.data);
};

export default {
  login,
  register,
  ownerLogin,
  ownerRegister,
};
