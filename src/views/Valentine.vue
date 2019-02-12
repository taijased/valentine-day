
<template lang="pug">
  .about-valentine(@click="toggleFullScreen()")
    canvas(id="heart_for_love", class="heartbeat")
    .description(v-if="data")
      .fromWhom {{data.from}}
      .text {{data.text}}
      .forWhom {{data.to}}
</template>

<script>
import Heart from "../service/heart.js";
import ValentineService from '../api/ValentineService.js';
export default {
  data () {
    return {
      data: null
    }
  },
  methods: {
    toggleFullScreen() {
      if (
            (document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)
        ) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(
                    Element.ALLOW_KEYBOARD_INPUT
                );
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
  },
  created() {
    
    this.$nextTick(() => {
      setTimeout(() => {
        this.toggleFullScreen();
      }, 1500);
      if (this.$route.params.id) {
        Heart.runHeart("heart_for_love");
        new Promise((resolve, reject) => {
          ValentineService.getValentine(this.$route.params.id)
            .then(response => {
              console.log(response.data);
              setTimeout(() => {
                this.data = response.data
              }, 4500);
              resolve(response);
            })
            .catch(error => {
              this.$router.push("/error404");
              console.log('error: ' + error);
            });
        });
      } else {
        this.$router.push("/error404");
      }
      
    });
  }
};
</script>

<style lang="less">
@xs: ~"(max-width: 576px)";

.about-valentine {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  canvas {
    position: absolute;
    background-color: rgba(0, 0, 0, 1);
    z-index: 10;
    @media @xs {
      width: 320px;
      height: 320px
    }
  }
  
}

.description {
  color: #fff;
  position: absolute;
  height: 100%;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  font-family: TT Norms Regular;
  .fromWhom {
    text-align: left;
    margin: 0 25px;
    margin-bottom: 15px;
    font-size: 32px;
  }
  .text {
    font-size: 28px;
    margin: 0 25px;
    // line-height: 21px;
    min-height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

  }
  .forWhom {
    text-align: right;
    margin: 0 25px;
    margin-top: 10px;
    font-size: 32px;
  }
}
</style>
