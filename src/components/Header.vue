<template>
  <div class="container fade-in-top">
    <a href="http://tim.agency/">
      <div class="header-logo">
        <!-- <a href="/">
          <img src="../assets/img/arq-logo.png">
        </a> -->
        <div class="header-logo-title noselect">Tim Agency</div>
      </div>
    </a>
    <div class="internationalization noselect">
      <div @click="setLocalization()">{{$t("internationalization.title")}}</div>
    </div>
  </div>
</template>
<script>

export default {
  methods: {
    setLocalization() {
      this.$i18n.locale = this.$i18n.locale === "ru" ? "en" : "ru";
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
  font-family: TT Norms Medium;
  padding: 0 8%;
  a {
    text-decoration: none;
    color: inherit;
  }
  .header-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    img {
      height: 50px;
    }
    .header-logo-title {
      font-family: TT Norms Medium;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
      font-size: 24px;
      letter-spacing: -0.75px;
    }
  }
  .internationalization {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.7);
    transition: color .3s ease-in-out;
    cursor: pointer !important;
    font-family: TT Norms Regular;
    font-style: normal;
    font-weight: normal;
    line-height: 28px;
    font-size: 18px;
    text-align: right;
    letter-spacing: -0.75px;
    &:hover {
      color: rgba(255, 255, 255, 1);
      transition: color .3s ease-in-out;
    }
  }

  .noselect {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
}
.fade-in-top {
  -webkit-animation: fade-in-top .7s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-top .7s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
@-webkit-keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
