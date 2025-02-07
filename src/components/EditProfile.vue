<template>
  <div class="edit-profile-container">
    <h1>Edit Profile</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="column">
        <div class="form-fields">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="formUser.username"
              type="text"
              id="username"
              placeholder="Enter new username"
              @input="clearValidationError('username')"
            />
            <p v-if="validationErrors.username" class="error-message">
              {{ validationErrors.username }}
            </p>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="formUser.email"
              type="email"
              id="email"
              placeholder="Enter new email"
              @input="clearValidationError('email')"
            />
            <p v-if="validationErrors.email" class="error-message">
              {{ validationErrors.email }}
            </p>
          </div>

          <div class="form-group">
            <label for="password">New Password</label>
            <input
              v-model="formUser.password"
              type="password"
              id="password"
              placeholder="Enter new password"
              @input="clearValidationError('password')"
            />
            <p v-if="validationErrors.password" class="error-message">
              {{ validationErrors.password }}
            </p>
          </div>
        </div>
        <div class="button">
          <button type="submit" class="btn">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UserService from '@/services/UsersService';

export default {
  name: 'EditProfile',
  data() {
    return {
      formUser: {
        username: '',
        email: '',
        password: '',
      },
      validationErrors: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  watch: {
    user: {
      handler(newUser) {
        if (newUser) {
          this.formUser.username = newUser.username;
          this.formUser.email = newUser.email;
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['fetchProfile', 'updateUser']),

    validateForm() {
      let isValid = true;
      this.validationErrors = { username: '', email: '', password: '' };

      if (!this.formUser.username.trim()) {
        isValid = false;
        this.validationErrors.username = 'Username is required.';
      }
      if (!this.formUser.email.trim()) {
        isValid = false;
        this.validationErrors.email = 'Email is required.';
      } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(this.formUser.email)) {
        isValid = false;
        this.validationErrors.email = 'Invalid email format.';
      }
      if (this.formUser.password && this.formUser.password.length < 5) {
        isValid = false;
        this.validationErrors.password = 'Password must be at least 5 characters long.';
      }
      return isValid;
    },

    async submitForm() {
      if (!this.validateForm()) return;

      const isUsernameChanged = this.formUser.username !== this.user.username;
      const isEmailChanged = this.formUser.email !== this.user.email;
      const isPasswordProvided = this.formUser.password.trim().length > 0;

      if (!isUsernameChanged && !isEmailChanged && !isPasswordProvided) {
        this.$router.push('/profile');
        return;
      }

      try {
        const emailResponse = await UserService.checkEmailExists(
          JSON.stringify(this.formUser.email)
        );
        const usernameResponse = await UserService.checkUsernameExists(
          JSON.stringify(this.formUser.username)
        );

        console.log('User', emailResponse.data, usernameResponse.data);
        if (emailResponse.exists) {
          this.validationErrors.email = 'This email is already in use.';
          return;
        }
        if (usernameResponse.exists) {
          this.validationErrors.username = 'This username is already in use.';
          return;
        }

        const updateResponse = await this.updateUser(this.formUser);

        if (updateResponse.success) {
          alert('Profile updated successfully!');
          this.$router.push('/profile');
        } else {
          alert('Failed to update profile, username or email is already taken.');
        }
      } catch (error) {
        alert('Failed to update profile, username or email is already taken.');
      }
    },

    clearValidationError(field) {
      this.validationErrors[field] = '';
    },
  },
  created() {
    if (!this.user) {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.edit-profile-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #3a2970;
}

.form {
  display: flex;
  align-self: center;
  gap: 30px;
  width: 50%;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  width: 100%;
}

.form-group {
  width: 100%;
  margin-bottom: 10px;
}

label {
  display: block;
  font-size: small;
  margin-bottom: 0;
}

input {
  width: 100%;
  padding: 7px;
  font-size: small;
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
  padding: 5px 100px;
  margin-top: 20px;
  color: white;
}

.btn:hover {
  background: #4c3991;
  color: white;
}

.error-message {
  color: red;
  font-size: small;
  margin: 1px 0;
}

@media (max-width: 600px) {
  .form {
    width: 70%;
  }
}
</style>
