<template>
  <div class="page-dashboard">
    <div class="temp-block">
      <div class="name">{{ name }}</div>
      <div class="slogan">欢迎进入{{ title }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultSettings from '@/settings'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  data() {
    return {
      title: defaultSettings.title,
    }
  },
}
</script>

<style lang="scss">
.page-dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  .temp-block {
    .slogan {
      font-size: 24px;
    }
  }
}
</style>
