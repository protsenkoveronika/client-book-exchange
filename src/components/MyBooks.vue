<template>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    rel="stylesheet"
  />

  <div class="header">
    <h1>Your books</h1>
    <a href="/addBook" class="btn add-book-btn">+ Add Book</a>
  </div>
  <p class="subheading">Manage, edit, and offer with ease - your books, your way!</p>
  <section
    class="grid"
    :style="{
      'grid-template-columns':
        books.length < 6
          ? 'repeat(auto-fit, minmax(155px, 160px))'
          : 'repeat(auto-fit, minmax(155px, 0.5fr))',
    }"
  >
    <div class="card" v-for="book in books" :key="book.id">
      <a :href="`/myBook/${book._id}`" class="card-link">
        <div class="image-placeholder">
          <img :src="book.photo" alt="Book image" />
        </div>
        <div class="book-title">{{ book.name }}</div>
        <p class="author">{{ book.author }}</p>
        <p class="location"><i class="fa-solid fa-location-dot"></i> {{ book.location }}</p>
      </a>
      <a v-if="book.status !== 'reserved'" class="btn" :href="`/editBook/${book._id}`">Edit</a>
      <a v-else class="btn taken" :href="`/myBook/${book._id}`">Taken</a>
    </div>
  </section>
</template>

<script>
import BooksService from '@/services/BooksService';
import { mapState } from 'vuex';

export default {
  // eslint-disable-next-line
  name: 'Books',
  data() {
    return {
      books: [],
    };
  },
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    this.loadBooks();
  },
  methods: {
    async loadBooks() {
      try {
        const response = await BooksService.getUserBooks();
        // console.log("User from Vuex store:", this.$store.state.user);
        // this.books = response.data.filter((book) => book.owner._id === this.user.id);
        this.books = response.data;
      } catch (error) {
        console.error('Error loading books:', error);
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.add-book-btn {
  border: none;
  background: #3a2970;
  padding: 5px 100px;
  color: white;
}

.btn.add-book-btn {
  border-radius: 100px;
}

.add-book-btn:hover {
  background: #4c3991;
  color: white;
}

.add-book-btn:focus {
  outline: none;
  box-shadow: none;
  background: #3a2970;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 7px;
  color: #3a2970;
}

.subheading {
  font-size: 12px;
  margin-bottom: 20px;
  color: #544d6c;
}

.grid {
  display: grid;
  gap: 20px;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card {
  position: unset;
  background: white;
  border: none;
  border-radius: 0;
  transition: transform 0.3s ease-in-out;
  justify-content: space-between;
}

.card:hover {
  transform: scale(1.03);
  cursor: pointer;
}

.image-placeholder {
  width: 100%;
  height: 220px;
  background: #ccc;
  border-radius: 0;
  margin-bottom: 10px;
}

.image-placeholder img {
  width: 100%;
  height: 220px;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  margin: 14px 0 5px 0;
  line-height: 1;
}

.author {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.location {
  font-size: small;
  color: #333;
  margin-bottom: 10px;
}

i {
  color: #3a2970;
  margin-right: 3px;
}

.btn.taken {
  display: inline-block;
  padding: 6px 20px;
  border: none;
  border-radius: 0;
  font-size: 14px;
  color: black;
  text-decoration: none;
  background: #e8e8e8;
}

.btn.taken:hover {
  background-color: #e8e8e8;
  color: black;
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

@media (max-width: 690px) {
  .btn.add-book-btn {
    padding: 5px 20px;
    font-size: 12px;
  }
}

@media (max-width: 410px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 0.5fr)) !important;
  }
}
</style>
