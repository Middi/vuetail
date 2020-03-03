<template>
  <div id="app">
    <ul id="example-1">
      <li v-for="item in news" :key="item.id">
        <h2 class="text-3xl">{{ item.title }}</h2>
        <p class="mt-20" v-html="item.body"></p>
      </li>
    </ul>
  </div>
</template>

<script>

import axios from 'axios';
import './assets/styles/index.css';

export default {
  name: 'App',
  components: {
    
  },
  data () {
      return {
          news: []
      }
  },
  mounted () {
      axios
      .get('http://localhost:8000/api/v2/pages/?type=news.NewsPage&fields=intro,body')
      .then(response => (this.news = response.data.items))
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
