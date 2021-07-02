<template>
  <div class="page-dashboard">
    <div class="temp-block">
      <div class="slogan">欢迎进入{{ title }}</div>
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/settings'

export default {
  name: 'Dashboard',
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
  text-align: center;
  .temp-block {
    .slogan {
      font-size: 24px;
    }
  }
}
</style>
