<template>
  <div id="app">
    <navigationBar/>
    <router-view></router-view>
  </div>
</template>

<script>

import axiosInstance from './axios';
import navigationBar from '@/components/navigationBar.vue';

export default {
  name: 'app',
  components: {
    navigationBar,
  },
  created: function() {
    axiosInstance.interceptors.response.use(response => response, (err) => {
      const error = err.response;
      if (error.status === 401) {
        this.$store.dispatch('authLogout');
        this.$router.push('/user/login')
      }
      return Promise.reject(err);
    })
  },
}
</script>

<style>

</style>
