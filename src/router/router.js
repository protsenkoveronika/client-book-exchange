import { createRouter, createWebHistory } from 'vue-router';
import Books from '../components/Books.vue';
import LogIn from '../components/LogIn.vue';
import SignUp from '../components/SignUp.vue';
import Book from '../components/Book.vue';
import Profile from '../components/Profile.vue';
import SearchResults from '../components/SearchResults.vue';
import MyBooks from '../components/MyBooks.vue';
import MyOrders from '../components/MyOrders.vue';
import MyBook from '../components/MyBook.vue';
import MyOrder from '../components/MyOrder.vue';
import TakeBook from '../components/TakeBook.vue';
import Add from '@/components/Add.vue';
import EditBook from '@/components/EditBook.vue';
import BooksService from '../services/BooksService.js';
import UsersTable from '@/components/UsersTable.vue';
import BooksTable from '@/components/BooksTable.vue';
// import OrdersTable from '@/components/OrdersTable.vue';
import EditProfile from '@/components/EditProfile.vue';
import UpdateUser from '@/components/UpdateUser.vue';
import UpdateBook from '@/components/UpdateBook.vue';

const routes = [
  { path: '/', name: 'Books', component: Books },
  { path: '/searchResults', name: 'SearchResults', component: SearchResults },
  {
    path: '/login',
    component: LogIn,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        next(from.fullPath);
      } else {
        next();
      }
    },
  },
  {
    path: '/signup',
    component: SignUp,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (token) {
        next(from.fullPath);
      } else {
        next();
      }
    },
  },
  { path: '/book/:_id', component: Book, props: (route) => ({ _id: route.params._id }) },
  {
    path: '/myBook/:_id',
    component: MyBook,
    props: (route) => ({ _id: route.params._id }),
    beforeEnter: async (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        return next(from.fullPath);
      }

      try {
        const bookId = to.params._id;
        const response = await BooksService.get(bookId);
        const book = response.data;

        const loggedUser = JSON.parse(localStorage.getItem('user'));

        console.log('Logged user:', loggedUser);
        console.log('Book owner:', book.owner);

        if (loggedUser.id === book.owner._id) {
          next();
        } else {
          next(from.fullPath);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        next('/');
      }
    },
  },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/editProfile',
    component: EditProfile,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/updateUser/:_id',
    component: UpdateUser,
    props: (route) => ({ _id: route.params._id }),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      const isAdmin = localStorage.getItem('adminCheck') === 'true';

      if (!token) {
        next('/login');
      } else if (!isAdmin) {
        next(from.fullPath);
      } else {
        next();
      }
    },
  },
  {
    path: '/updateBook/:_id',
    component: UpdateBook,
    props: (route) => ({ _id: route.params._id }),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      const isAdmin = localStorage.getItem('adminCheck') === 'true';

      if (!token) {
        next('/login');
      } else if (!isAdmin) {
        next(from.fullPath);
      } else {
        next();
      }
    },
  },
  {
    path: '/myBooks',
    component: MyBooks,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/myOrders',
    component: MyOrders,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/myOrder/:_id',
    component: MyOrder,
    props: (route) => ({ _id: route.params._id }),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/takeBook/:_id',
    component: TakeBook,
    props: (route) => ({ _id: route.params._id }),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/addBook',
    component: Add,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/editBook/:_id',
    component: EditBook,
    props: (route) => ({ _id: route.params._id }),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/admin/users',
    component: UsersTable,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      const isAdmin = localStorage.getItem('adminCheck') === 'true';

      if (!token) {
        next('/login');
      } else if (!isAdmin) {
        next(from.fullPath);
      } else {
        next();
      }
    },
  },
  {
    path: '/admin/books',
    component: BooksTable,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      const isAdmin = localStorage.getItem('adminCheck') === 'true';

      if (!token) {
        next('/login');
      } else if (!isAdmin) {
        next(from.fullPath);
      } else {
        next();
      }
    },
  },
  // {
  //   path: '/admin/orders',
  //   component: OrdersTable,
  //   beforeEnter: (to, from, next) => {
  //     const token = localStorage.getItem('token');
  //     const isAdmin = localStorage.getItem('adminCheck') === 'true';
  //
  //     if (!token) {
  //       next('/login');
  //     } else if (!isAdmin) {
  //       next(from.fullPath);
  //     } else {
  //       next();
  //     }
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,
  routes,
});

export default router;
