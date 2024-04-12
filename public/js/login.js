/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email: email,
        password: password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', 'Incorrect email or password');
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    console.log(res.data.status);
    // showAlert('success', 'Logged out successfully!');
    if ((res.data.status = 'success')) {
      location.reload(true);
    }
  } catch (error) {
    // showAlert('error', 'Something went wrong');
    console.log('error');
  }
};
