<template>
    <div class="error">
        <div class="error-title">404</div>
        <div class="error-subtitle">{{$t("error404.subtitle")}}</div>
        <div class="btn-error"  @click="$router.push('/')">{{$t("error404.btntitle")}}</div>
    </div>
</template>

<style lang="less" scoped>
.error {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .error-title {
        color: #9a0f20;
        font-family: TT Norms Bold;
        line-height: normal;
        font-size: 200px;
    }
    .error-subtitle {
        font-family: TT Norms Medium;
        line-height: normal;
        font-size: 26px;
        color: #000;
    }
    .btn-error {
        font-family: TT Norms Regular;
        background: #9a0f20;
        border-radius: 40px;
        padding: 10px 20px;
        color: white;
        margin-top: 30px;
        opacity: 1;
        transition: opacity .2s ease-in;
        &:hover {
            cursor: pointer;
            opacity: 0.6;
            transition: opacity .2s ease-in;
        }
    }
}
</style>
