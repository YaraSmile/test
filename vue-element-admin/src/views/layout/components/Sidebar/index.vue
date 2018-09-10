<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#f5f5f5"
      text-color="#393939"
      active-text-color="#2B7DBC"
    >
      <sidebar-item v-for="route in constantRouterMap" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { constantRouterMap } from '@/router/index'

export default {
  components: { SidebarItem },
  data() {
    return {
      constantRouterMap
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    console.log(111, this.constantRouterMap)
  }
}
</script>
