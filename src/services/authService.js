import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import apiClient from './apiClient';
import { ENDPOINTS } from './apiConstants';

export const loginUser = async ({ email, password }) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('Email not registered. Please register first.');
  }

  let user = null;
  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    if (userData.password === password) {
      user = { id: doc.id, ...userData };
    }
  });

  if (!user) {
    throw new Error('Incorrect password. Try again.');
  }

  return user;
};

export const registerUser = async (payload) => {
  const response = await apiClient.post(ENDPOINTS.register, payload);
  return response.data;
};
