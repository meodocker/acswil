/* eslint-disable */
import axios from 'axios';

const logout = async () => {
  const res = await axios({
    method: 'GET',
    url: '/api/v1/users/logout',
  });
  if ((res.data.status = 'success')) location.reload(true);
};

document.querySelector('.logOut').addEventListener('click', logout);
