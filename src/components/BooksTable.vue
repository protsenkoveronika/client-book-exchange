<template>
  <div class="links">
    <nav>
      <ul>
        <li><router-link to="/admin/users">Users</router-link></li>
        <li><router-link to="/admin/books">Books</router-link></li>
      </ul>
    </nav>
  </div>
  <div class="header">
    <h1>Books</h1>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Photo</th>
          <th style="min-width: 700px">Description</th>
          <th>Location</th>
          <th style="min-width: 200px">Owner's Username</th>
          <th>Owner's Phone</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book._id">
          <td>{{ book._id }}</td>
          <td>{{ book.name }}</td>
          <td>{{ book.author }}</td>
          <td><img :src="book.photo" alt="Book image" /></td>
          <td>{{ book.description }}</td>
          <td>{{ book.location }}</td>
          <td>{{ book.owner?.username }}</td>
          <td>{{ book.contactPhone }}</td>
          <td>{{ book.status }}</td>
          <td style="display: flex">
            <router-link :to="'/updateBook/' + book._id" class="btn btn-warning"
              >Update</router-link
            >
            <button
              class="btn btn-danger"
              @click="deleteBook(book._id)"
              style="margin-left: 0.3rem"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BooksService from '@/services/BooksService';

export default {
  name: 'BooksTable',
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.loadBooks();
  },
  methods: {
    async loadBooks() {
      try {
        const response = await BooksService.getAll();
        this.books = response.data;
      } catch (error) {
        console.error('Error loading books:', error);
      }
    },
    async deleteBook(bookId) {
      if (!confirm('Are you sure you want to delete this book?')) {
        return;
      }

      try {
        await BooksService.delete(bookId);
        this.books = this.books.filter((book) => book._id !== bookId);
        alert('Book deleted successfully.');
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book.');
      }
    },
  },
};
</script>

<style scoped>
.links {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

nav ul {
  margin: 2px 0 0 0;
  padding: 0;
  justify-content: center;
  display: flex;
  gap: 15px;
}

nav li {
  display: flex;
}

nav a {
  font-size: medium;
  color: black;
  text-decoration: underline;
  transition: color 0.3s;
}

nav a:hover {
  color: #3a2970;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.btn.btn-warning {
  border: #e19300 1px solid;
  color: #e19300;
}

.btn.btn-warning:hover {
  background-color: #e19300;
}

.btn.btn-danger {
  border: #df0101 1px solid;
  color: #df0101;
}

.btn.btn-danger:hover {
  background-color: #df0101;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 7px;
  color: #3a2970;
}

.btn {
  display: inline-block;
  padding: 6px 20px;
  border: 1px solid black;
  border-radius: 0;
  font-size: 14px;
  color: black;
  text-decoration: none;
  background: none;
  transition: 0.3s;
}

.btn:hover {
  background-color: #3a2970;
  color: white;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.table td {
  min-width: 160px;
}

img {
  width: 100px;
  height: auto;
}
</style>
