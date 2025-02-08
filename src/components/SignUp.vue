<template>
  <div class="log-container">
    <h2>Sign Up</h2>
    <p>Join our community of book lovers and get opportunity to exchange your favourite books.</p>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input
          v-model="formData.username"
          type="text"
          class="form-control"
          name="firstname"
          placeholder="Your Username"
          @input="clearValidationError('username')"
        />
        <span class="error-message">{{ validationErrors.username }}</span>
      </div>
      <div class="form-group">
        <input
          v-model="formData.email"
          type="email"
          class="form-control"
          name="email"
          placeholder="Your Email Address"
          @input="clearValidationError('email')"
        />
        <span class="error-message">{{ validationErrors.email }}</span>
      </div>
      <div class="form-group">
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          name="firstname"
          placeholder="Your Password"
          @input="clearValidationError('password')"
        />
        <span class="error-message">{{ validationErrors.password }}</span>
      </div>
      <div class="button">
        <button type="submit" class="btn">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../services/UsersService.js';
import { mapMutations } from 'vuex';

export default {
  name: 'SignUp',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        username: '',
        role: 'User',
      },
      validationErrors: {
        email: '',
        password: '',
        username: '',
      },
    };
  },
  methods: {
    ...mapMutations(['setLogCheck', 'setUser']),

    async submitForm() {
      const isValid = this.validateForm(
        this.formData.password,
        this.formData.username,
        this.formData.email
      );

      if (!isValid) {
        return;
      }

      try {
        const response = await UsersService.signup(this.formData);

        localStorage.setItem('token', response.data.token);

        this.setLogCheck(true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.setUser(response.data.user);

        if (response.data.role === 'admin') {
          this.setAdminCheck(true);
        }

        this.resetForm();

        this.$router.push('/');
        console.log('User created successfully:', response.data);
      } catch (error) {
        alert('Failed to sign up, username or email is already taken.');
      }
    },

    validateForm(password, username, email) {
      let isValid = true;
      this.validationErrors = {
        password: '',
        username: '',
        email: '',
      };

      if (!password.trim()) {
        isValid = false;
        this.validationErrors.password = 'Enter password';
      }

      if (!username.trim()) {
        isValid = false;
        this.validationErrors.username = 'Enter username';
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        isValid = false;
        this.validationErrors.email = 'Invalid email';
      }

      return isValid;
    },

    resetForm() {
      this.formData = {
        email: '',
        password: '',
        username: '',
        role: 'User',
      };
      this.validationErrors = {
        password: '',
        username: '',
        email: '',
      };
    },

    clearValidationError(field) {
      this.validationErrors[field] = '';
    },
  },
};
</script>

<style scoped>
.log-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 73px 50px 0 50px;
  padding: 30px 0;
}

form {
  width: 380px;
}

h2 {
  text-align: center;
  margin: 0;
  font-weight: bold;
  color: #3a2970;
}

p {
  margin: 10px 0 20px 0;
  font-size: 13px;
  text-align-last: center;
}

input {
  font-size: small;
}

.form-group {
  margin-bottom: 10px;
}

.button {
  display: flex;
  justify-content: center;
  padding: 0;
}

.btn {
  border: none;
  background: #3a2970;
  border-radius: 30px;
  padding: 3px 100px;
  margin-top: 4px;
  color: white;
}

.btn:hover {
  background: #4c3991;
  color: white;
}

.btn:focus {
  outline: none;
  box-shadow: none;
  background: #3a2970;
}

.error-message {
  color: red;
  font-size: small;
}

@media (max-width: 600px) {
  form {
    width: 100%;
  }

  .btn {
    width: 80%;
    padding: 3px 40px;
  }
}
</style>
