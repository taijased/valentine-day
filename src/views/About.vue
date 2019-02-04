
<template lang="pug">
  .about
    canvas(id="heart", class="heartbeat")
</template>

<script>
import Heart from "../service/heart.js";

export default {
  created() {
    this.$nextTick(() => {
      Heart.runHeart();
    });
  }
};
</script>

<style lang="scss" scoped>
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
