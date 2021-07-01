<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 v-else class="sidebar-title">{{ title }}</h1>
    </router-link>
    <router-link v-else key="expand" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 class="sidebar-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import logo from '@/assets/images/logo.png'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: defaultSettings.title,
      logo: logo,
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  background: $--color-text-primary;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    padding-left: 0px;
    text-align: center;
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
