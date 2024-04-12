/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const signup = async (name, email, password, role) => {
  try {
    console.log(role);
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name: name,
        email: email,
        password: password,
        role: role,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', 'Something went wrong');
  }
};
