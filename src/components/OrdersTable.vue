<template>
  <div class="links">
    <nav>
      <ul>
        <li><router-link to="/admin/users">Users</router-link></li>
        <li><router-link to="/admin/books">Books</router-link></li>
        <li><router-link to="/admin/orders">Orders</router-link></li>
      </ul>
    </nav>
  </div>
  <div class="header">
    <h1>Orders</h1>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Book ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Photo</th>
          <th>Owner's ID</th>
          <th>Owner's Username</th>
          <th>Owner's Phone</th>
          <th>Reserved By ID</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.book._id }}</td>
          <td>{{ order.book.name }}</td>
          <td>{{ order.book.author }}</td>
          <td>
            <img
              :src="'http://localhost:8000/' + order.book.photo"
              alt="Book image"
              style="width: 100px; height: auto"
            />
          </td>
          <td>{{ order.book.owner._id }}</td>
          <td>{{ order.book.owner.username }}</td>
          <td>{{ order.book.contactPhone }}</td>
          <td>{{ order.reservedBy._id }}</td>
          <td>{{ order.reservedBy.username }}</td>
          <td>{{ order.firstName + ' ' + order.lastName }}</td>
          <td>{{ order.phoneNumber }}</td>
          <td>{{ order.address }}</td>
          <!-- Reserved By -->
          <td style="display: flex">
            <router-link :to="'/editOrder/' + order._id" class="btn btn-warning"
              >Update</router-link
            >
            <button
              class="btn btn-danger"
              @click="deleteReservation(order._id)"
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
import OrdersService from '@/services/OrdersService';

export default {
  name: 'OrdersTable',
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.getAllOrders();
  },
  methods: {
    async getAllOrders() {
      try {
        const response = await OrdersService.getAllReservations();
        this.orders = response.data;
      } catch (error) {
        console.error('Error loading orders:', error);
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
  width: 85px;
  height: 120px;
}
</style>
