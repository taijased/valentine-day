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
                //- canvas(id="heart")
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
      Heart.runHeart();
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
        width: 100%;
      .fromWhom {
        text-align: left;
        margin: 0 25px;
        margin-bottom: 15px;
      }
      .text {
        font-family: TT Norms Regular;
        font-size: 18px;
        margin: 0 25px;
        line-height: 21px;
      }
      .forWhom {
        text-align: right;
        margin: 0 25px;
        margin-top: 10px;
      }
    }
  }
}
canvas {
  //   position: absolute;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  //   left: 0;
  //   right: 0;
  //   z-index: 1;
}
</style>
