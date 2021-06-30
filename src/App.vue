<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import '~@/styles/index.scss'; // 后续删

#app {
  height: 100%;
}
</style>
