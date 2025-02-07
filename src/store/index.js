import { createStore } from 'vuex';
import UsersService from '@/services/UsersService';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    logCheck: localStorage.getItem('logCheck') === 'true' || false,
    adminCheck: localStorage.getItem('adminCheck') === 'true' || false,
  },
  mutations: {
    setLogCheck(state, value) {
      state.logCheck = value;
      localStorage.setItem('logCheck', value);
    },
    setAdminCheck(state, value) {
      state.adminCheck = value;
      localStorage.setItem('adminCheck', value);
    },
    setUser(state, user) {
      state.user = user ? { ...user } : null;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  actions: {
    async fetchProfile({ commit }) {
      try {
        const response = await UsersService.profile();
        if (response && response.data) {
          commit('setUser', response.data);
          console.log('User profile updated:', response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },
    async updateUser({ commit }, updatedUser) {
      try {
        const response = await UsersService.updateProfile(updatedUser);

        if (response && response.data) {
          const updatedUserData = {
            ...response.data.user,
            role: response.data.role,
          };

          commit('setUser', updatedUserData);
          return { success: true, message: 'Profile updated successfully' };
        }

        return { success: false, message: 'Profile update failed' };
      } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, message: 'Failed to update profile' };
      }
    },
    logOut({ commit }) {
      commit('setLogCheck', false);
      commit('setAdminCheck', false);
      commit('clearUser');
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated: (state) => state.logCheck,
    isAdmin: (state) => state.adminCheck,
    getUser: (state) => state.user,
  },
});
