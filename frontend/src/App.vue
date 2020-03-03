<template>
  <div class="container" id="app">
        <h2 class="text-3xl">{{ home[0].title }}</h2>
        <img v-if="home[0].image_thumbnail" :src="'http://localhost:8000' + home[0].image_thumbnail.url" alt="">
  </div>
</template>

<script>

import './assets/styles/index.css';

export default {
  name: 'App',
  components: {
    
  },
  data () {
      return {
          home: []
      }
  },
  mounted () {
    fetch('http://localhost:8000/api/v2/pages/?type=home.HomePage&fields=image_thumbnail')
      .then(res => res.json())
      .then(res => this.home = res.items)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
