<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import ValentineService from "./api/ValentineService.js";

export default {
  created () {
    new Promise((resolve, reject) => {
      ValentineService.uniqueCounter()
        .then(resolve)
        .catch(reject);
    });
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: white;
}
</style>
