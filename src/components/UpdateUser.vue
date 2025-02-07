<template>
  <div class="edit-profile-container">
    <h1>Edit User</h1>
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
            <label for="role">Role</label>
            <select v-model="formUser.role" id="role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p v-if="validationErrors.role" class="error-message">
              {{ validationErrors.role }}
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
import UserService from '@/services/UsersService';

export default {
  name: 'UpdateUser',
  props: {
    _id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formUser: {
        username: '',
        email: '',
        role: 'user',
      },
      validationErrors: {
        username: '',
        email: '',
        role: '',
      },
    };
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const response = await UserService.getUserById(this._id);
        if (response.data) {
          this.formUser = {
            username: response.data.username || '',
            email: response.data.email || '',
            role: response.data.role || '',
          };
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },

    validateForm() {
      let isValid = true;
      this.validationErrors = { username: '', email: '', role: '' };

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
      if (!this.formUser.role) {
        isValid = false;
        this.validationErrors.role = 'Role is required.';
      }

      return isValid;
    },

    async submitForm() {
      if (!this.validateForm()) return;

      const updatedData = {
        username: this.formUser.username,
        email: this.formUser.email,
        role: this.formUser.role,
      };

      try {
        const emailResponse = await UserService.checkEmailExists(
          JSON.stringify(this.formUser.email)
        );
        const usernameResponse = await UserService.checkUsernameExists(
          JSON.stringify(this.formUser.username)
        );

        console.log('User', emailResponse.data, usernameResponse.data);
        console.log(
          'User',
          JSON.stringify(this.formUser.email),
          JSON.stringify(this.formUser.username)
        );
        if (emailResponse.exists) {
          this.validationErrors.email = 'This email is already in use.';
          return;
        }
        if (usernameResponse.exists) {
          this.validationErrors.username = 'This username is already in use.';
          return;
        }

        await UserService.updateUser({ userId: this._id, ...updatedData });
        alert('User updated successfully!');
        this.$router.push('/admin/users');
      } catch (error) {
        alert('Failed to update user, username or email is already taken.');
      }
    },

    clearValidationError(field) {
      this.validationErrors[field] = '';
    },
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
</style>
