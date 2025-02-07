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
    <h1>Users</h1>
    <!--    <a href="admin/addUser" class="btn add-user-btn">+ Add User</a>-->
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user._id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td style="display: flex">
            <router-link :to="'/updateUser/' + user._id" class="btn btn-warning"
              >Update</router-link
            >
            <button
              class="btn btn-danger"
              @click="handleDelete(user._id)"
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
import UsersService from '@/services/UsersService';
import { mapState } from 'vuex';

export default {
  name: 'UsersTable',
  data() {
    return {
      users: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    handleDelete(id) {
      if (this.user.id === id) {
        alert('You cannot delete yourself.');
        return;
      }

      if (confirm('Are you sure you want to delete this user?')) {
        this.deleteUser(id);
      }
    },
    deleteUser(id) {
      UsersService.deleteUser(id)
        .then(() => {
          this.users = this.users.filter((user) => user._id !== id);
          console.log(`User with ID ${id} deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Error deleting user with ID ${id}:`, error);
        });
    },
  },
  mounted() {
    UsersService.getAllUsers()
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
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

.btn.add-user-btn {
  border-radius: 100px;
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
</style>
