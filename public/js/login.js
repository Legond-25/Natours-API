import axios from 'axios';
import { showAlert } from './alerts.js';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged In Successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    showAlert('success', 'Logged Out Successfully! Thank You');

    window.setTimeout(() => {
      if (res.data.status === 'success') {
        location.reload(true); // To reload page from server set true
        location.assign('/');
      }
    }, 1500);
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
