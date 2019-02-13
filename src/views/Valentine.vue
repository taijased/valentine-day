
<template lang="pug">
  .about-valentine(@click="toggleFullScreen()")
    canvas(id="heart_for_love", width="320", height="320")
    .description(v-if="data")
      .fromWhom.fade-in-left {{data.From}}
      .text.fade-in {{data.Text}}
      .forWhom.fade-in-right {{data.To}}
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
        new Promise((resolve, reject) => {
          ValentineService.getValentine(this.$route.params.id)
            .then(response => {
              console.log(response.data);
              if (response.data.Card) {
                Heart.runHeart("heart_for_love");
                setTimeout(() => {
                  this.data = response.data.Card
                }, 4500);
              } else {
                this.$router.push("/error404");
              }
              
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
    width: 100%;
    background-color: rgba(0, 0, 0, 1);
    z-index: 10;
    // @media @xs {
    //   transform: scale(0.6);
    // }
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
.fade-in-left {
	-webkit-animation: fade-in-left 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: fade-in-left 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
@-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
            transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
.fade-in {
	-webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1s both;
	        animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1s both;
}
@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fade-in-right {
	-webkit-animation: fade-in-right 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 2s both;
	        animation: fade-in-right 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 2s both;
}
@-webkit-keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
            transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
            transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}

</style>
