
<template lang="pug">
  .about
    canvas(id="heart_for_love")
</template>

<script>
import Heart from "../service/heart.js";
import ValentineService from '../api/ValentineService.js';
export default {
  created() {
    this.$nextTick(() => {
      new Promise((resolve, reject) => {
        ValentineService.createValentine(this.$route.params.id)
          .then(response => {
            console.log(response.data);
            // if (this.$route.params.id) {
            //   Heart.customHeart("heart_for_love");
            // } else {
            //   this.$router.push("/error404");
            // }

            resolve(response);
          })
          .catch(error => {
            // this.$router.push("/error404");
            console.log('error: ' + error);
          });
      });
    });
  }
};
</script>

<style lang="less" scoped>
@xs: ~"(max-width: 576px)";
.about {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 1);
}
canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 1);
  z-index: 10;
}
</style>
