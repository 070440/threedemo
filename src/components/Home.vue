<template>
  <div id="container">
    <button v-for="item in list" :key="item.path" class="button" @click="goto(item.path)">{{item.path.substr(1)}}</button>
  </div>
</template>

<script>
import router from '../router'
export default {
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  },
  data() {
    return {
      list: router.options.routes.filter(item => item.path != '/')
    }
  }
};
</script>
<style>
.button {
  height: 30px;
  width: 70px;
  border-radius: 5px;
  background-color: aqua;
}
</style>
