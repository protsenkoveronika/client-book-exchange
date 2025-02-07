<template>
  <header>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
    <div class="side-left">
      <div class="logo">Common Shelf</div>
      <nav>
        <ul>
          <li><router-link to="/">Home page</router-link></li>
          <li><router-link :to="logCheck ? '/myBooks' : '/Login'">My books</router-link></li>
          <li><router-link :to="logCheck ? '/myOrders' : '/Login'">My orders</router-link></li>
          <li><router-link :to="logCheck ? '/profile' : '/Login'">Profile</router-link></li>
          <li v-if="adminCheck"><router-link to="/admin/users">Admin page</router-link></li>
        </ul>
      </nav>
    </div>
    <div class="side-right">
      <div class="search-container">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          class="search-input"
          v-model="searchQuery"
        />
        <a href="#" class="search-btn" @click="search">
          <i class="fas fa-search"></i>
        </a>
      </div>

      <a v-if="logCheck" class="btn" @click="handleLogOut">Log out</a>

      <li v-else class="log-btn">
        <router-link to="/Login" class="btn">Log in</router-link>
        <router-link to="/Signup" class="btn signUp">Sign up</router-link>
      </li>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    ...mapState(['logCheck', 'adminCheck']),
  },
  methods: {
    ...mapActions(['logOut']),

    search() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/searchResults', query: { q: this.searchQuery } });
      }
    },

    async handleLogOut() {
      await this.logOut();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
header {
  background-color: white;
  border-bottom: #212529 solid 1px;
  position: fixed;
  color: black;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 18px 50px;
  z-index: 1000;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #3a2970;
  margin-right: 10px;
}

.side-left,
.side-right {
  display: flex;
  align-items: center;
  gap: 15px;
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
  font-size: small;
  color: black;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover {
  color: #3a2970;
}

.search-container {
  background: #f8f8f8;
  height: 15px;
  border-radius: 30px;
  padding: 13px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
}

.search-container .search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 120px;
  font-size: small;
  margin-top: 1px;
}

.search-container .search-btn .fas {
  color: #7a7a7a;
  font-variant: all-petite-caps;
}

a.search-btn {
  margin: 0 2px 2px 4px;
  width: 12px;
}

.btn {
  display: inline-block;
  padding: 1.5px 15px;
  width: 80px;
  border: 1px solid #aaaaaa;
  border-radius: 30px;
  font-size: small;
  color: black;
  text-decoration: none;
  cursor: pointer;
  background: none;
}

.btn.signUp {
  border: 1px solid black;
  color: #ffffff;
  background: black;
}

.log-btn {
  display: flex;
  gap: 7px;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

@media (max-width: 922px) {
  header {
    padding: 18px 30px;
  }

  .side-left {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
  }
}

@media (max-width: 690px) {
  .side-right {
    display: flex;
    flex-direction: column-reverse;
    align-items: end;
    gap: 12px;
  }
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }

  .side-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }

  .search-container {
    margin: 0;
  }
}

@media (max-width: 425px) {
  nav a {
    font-size: 11px;
    padding-left: 1px;
  }

  a.btn {
    font-size: 12px;
  }

  .search-container {
    padding: 11px 10px;
  }

  .search-input {
    width: 90px !important;
  }
}
</style>
