<template lang="pug">
  .wrapper
    canvas(id="heart", :class="{'heart-left': heartPosition}")
    header(v-if="heartPosition")
      AppHeader
    main(v-if="heartPosition")
      transition(name="fade", mode="out-in")
        router-view
    footer(v-if="heartPosition")
      div ВКонтакте
</template>
<script>
import AppHeader from '../components/Header';
import Heart from "../service/heart.js";

export default {
  data () {
    return {
      heartPosition: false
    }
  },
  created() {
    this.$nextTick(() => {
      Heart.runHeart();
      setTimeout(() => {
        this.heartPosition = true
      }, 3000);
    })
  },
  components: {
    AppHeader
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
}
.wrapper {
  position: absolute;
  display: grid;
  height: 100vh;
  grid-template-rows: 15vh 80vh 5vh;
  grid-template-columns: 50vw 50vw;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 1);
  z-index: 10;
  header {
    grid-row: 1;
    grid-column: ~"1 / 3";
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgba(0, 0, 0, 0);
  }
  main {
    grid-row: 2;
    grid-column: ~"1 / 3";
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  footer {
    grid-row: 3;
    grid-column: ~"1 / 3";
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    div {
      font-family: TT Norms Regular;
      font-style: normal;
      font-weight: normal;
      line-height: 28px;
      font-size: 18px;
      letter-spacing: -0.75px;
      color: #fff;
      margin-left: 8%;
      margin-top: -45px;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: -1;
}
.heart-left {
  transform: translate(25%, 0);
  transition: transform 1s
}

@-webkit-keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
            transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
            transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}

</style>