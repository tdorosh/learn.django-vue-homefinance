<template>
  <div id="app">
    <navigationBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import router from "@/router";
import store from '@/store.js'
import axiosInstance from './axios';
import navigationBar from '@/components/navigationBar.vue';

export default {
  name: 'app',
  components: {
    navigationBar,
  },
  created: function() {
    axiosInstance.interceptors.response.use(undefined, function(error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry && store.state.refreshToken) {
        originalRequest._retry = true;
        const payload = {
          refresh: store.state.refreshToken,
        }
        store.dispatch('refreshAuthRequest', payload)
          .then(() => {
            originalRequest.headers['Authorization'] = `Bearer ${store.state.accessToken}`;
            return axiosInstance(originalRequest);
          })
          .catch(() => {
            store.dispatch('authLogout')
            .then(() => {
              router.push('/user/login')
            })
          })
      }
      return Promise.reject(error)
    })
  },
}

</script>

<style>

</style>
