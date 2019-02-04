<template lang="pug">
  .creator
    h1 создать валентнку
    el-button(type="success", @click="$router.push('/about')") preview
</template>
<script>
import AppHeader from '../components/Header';

export default {
  components: {
    AppHeader
  }
};
</script>
<style lang="less" scoped>
.creator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    color: #fff;
}

</style>
