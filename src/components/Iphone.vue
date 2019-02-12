<template lang="pug">
    .iphone
        .marvel-device.iphone8plus.black
            .top-bar
            .sleep
            .volume
            .camera
            .sensor
            .speaker
            .screen
                canvas(id="heart")
                .description
                    .fromWhom {{getFromWhom}}
                    .text {{getText}}
                    .forWhom {{getForWhom}}
            .home
            .bottom-bar
</template>

<script>
import Heart from "../service/heart.js";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getFromWhom: "form/getFromWhom",
      getForWhom: "form/getForWhom",
      getText: "form/getText"
    })
  },
  created() {
    this.$nextTick(() => {
      Heart.runHeart('heart');
    });
  }
};
</script>

<style lang="less">
@import url("../style/devices.min.css");
.iphone {
  transform: scale(0.75);
  .screen {
    background: #000;
    color: #fff;
    font-family: TT Norms Medium;
    font-style: normal;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    font-size: 26px;
    .description {
      position: absolute;
      height: 100%;
      z-index: 100;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow-y: auto;
      .fromWhom {
        text-align: left;
        margin: 0 25px;
        margin-bottom: 15px;
        font-size: 32px;
      }
      .text {
        font-family: TT Norms Regular;
        font-size: 28px;
        margin: 0 25px;
        // line-height: 21px;
        min-height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .forWhom {
        text-align: right;
        margin: 0 25px;
        margin-top: 10px;
        font-size: 32px;
      }
    }
  }
}
canvas {
  width: 400%;
  // margin-left: auto;
  // margin-right: auto;
}
</style>
