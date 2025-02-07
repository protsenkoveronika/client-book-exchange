import http from '../http-common';

class BooksService {
  getAll() {
    return http.get('/book/all');
  }

  getUserReservations() {
    const token = localStorage.getItem('token');
    return http.get('/book/reservations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUserBooks() {
    const token = localStorage.getItem('token');
    return http.get('/book/my-books', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  get(_id) {
    return http.get(`/book/${_id}`);
  }

  create(formData) {
    const token = localStorage.getItem('token');
    return http.post('/book/new', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(_id, formData) {
    const token = localStorage.getItem('token');
    return http.put(`/book/upload/${_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete(_id) {
    const token = localStorage.getItem('token');
    return http.delete(`/book/delete/${_id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new BooksService();
