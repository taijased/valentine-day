<template lang="pug">
  .landing
    h1 {{$t("landing.title")}}
    .landing__description
      div {{$t("landing.subtitle")}}
      br
      br
      //- div {{$t("landing.desc.custom")}}
      div {{$t("landing.desc.text")}}
      //- div {{$t("landing.desc.music")}}
      div {{$t("landing.desc.anony")}}
      div.custom(v-if="getValentineCounter") {{$t("landing.counter")}} 
        div.heartbeat(class="counterheart") &#9829 {{getValentineCounter}}

    .btn-primary(@click="$router.push('/create-valentine')") {{$t("landing.btn")}}
    //- .footer {{$t("footer.vk")}}

</template>
<script>
import AppHeader from "../components/Header";
import ValentineService from "../api/ValentineService.js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters({
      getValentineCounter: "valentine/getValentineCounter",
    }),
  },
  methods: {
    ...mapActions({
      setCounterValentine: "valentine/setCounterValentine",
    }),
  },
  created () {
    new Promise((resolve, reject) => {
      ValentineService.getCounterValentine()
        .then(response => {
          this.setCounterValentine(response.data.count)
        })
        .catch(reject);
    });
  },
};
</script>
<style lang="less" scoped>
@xs: ~"(max-width: 576px)";

.landing {
  margin-top: -50px;
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  color: white;
  margin-left: 8%;
  -webkit-animation: fade-in-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @media @xs {
    margin: 0;
    align-items: center;
  }
  h1 {
    font-family: TT Norms Medium;
    font-style: normal;
    font-weight: 500;
    line-height: 47px;
    font-size: 36px;
    letter-spacing: -1.25px;
  }
  &__description {
    margin-bottom: 45px;
    @media @xs {
      text-align: center;
    }
    div {
      font-family: TT Norms Regular;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 20px;
    }
  }
  .btn-primary {
    background: #9a0f20;
    border-radius: 15px;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: color 0.3s, background 0.3s;
    font-family: TT Norms Regular;
    font-style: normal;
    font-weight: normal;
    line-height: 28px;
    font-size: 20px;
    letter-spacing: -0.75px;
    width: 300px;
    height: 70px;
    &:hover {
      color: #000;
      background: #fff;
      transition: color 0.3s, background 0.3s;
      cursor: pointer;
    }
  }
}
.footer {
  bottom: 5%;
  left: 0;
  align-items: flex-start;
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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
@-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-500px);
    transform: translateX(-500px);
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
    -webkit-transform: translateX(-500px);
    transform: translateX(-500px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
.custom {
  display: flex;
  flex-direction: row;
  align-items: center
}
.counterheart {
  margin-left: 10px;
  color: #9a0f20;
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
	  animation: heartbeat 1.5s ease-in-out infinite both;
}
.heartbeat {
	-webkit-animation: heartbeat 1.5s ease-in-out infinite both;
	        animation: heartbeat 1.5s ease-in-out infinite both;
}
@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}

</style>
