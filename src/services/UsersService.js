import http from '../http-common';

class UsersService {
  profile() {
    const token = localStorage.getItem('token');
    return http.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateProfile(userData) {
    const token = localStorage.getItem('token');
    return http.put('/auth/update-profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateUser(userData) {
    const token = localStorage.getItem('token');
    return http.put('/auth/update-user', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUserById(userId) {
    const token = localStorage.getItem('token');
    return http.get(`/admin/get-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  checkEmailExists(email) {
    return http.post('/auth/check-email-exists', { email: email });
  }

  checkUsernameExists(username) {
    return http.post('/auth/check-username-exists', { username: username });
  }

  getAllUsers() {
    return http.get('/admin/users');
  }

  deleteUser(userId) {
    const token = localStorage.getItem('token');
    return http.delete(`/admin/delete-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  login(credentials) {
    return http.post('/auth/login', credentials);
  }

  signup(credentials) {
    return http.post('/auth/register', credentials);
  }
}

export default new UsersService();
