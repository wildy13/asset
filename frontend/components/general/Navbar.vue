<template>
  <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <div class="flex justify-between">
      <div class="font-serif font-light">
        <ul class="flex">
          <li><a href="" class="mx-2">Dashboard</a></li>
          <div class="relative inline-block" x-data="{ open: false }">
            <button class="flex items-center" @click="open = !open">
              <span class="font font-light">Utility</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div v-if="open" v-show="open" class="px-2 py-2 absolute">
              <a href="" class="block px-5 py-2 text-sm" index="category">list 1</a>
              <a href="" class="block px-5 py-2 text-sm">list 2</a>
              <a href="" class="block px-5 py-2 text-sm">list 3</a>
              <a href="" class="block px-5 py-2 text-sm">list 4</a>
            </div>
          </div>
          <li><a href="" class="mx-2">Asset</a></li>
          <button class="flex items-center">
            <span class="font-light">Report</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <li><a href="" class="mx-2">User Data</a></li>
          <li><a href="" class="mx-2">Change Password</a></li>
        </ul>
      </div>
      <div class="flex font-serif font-light">
        <div class="mx-2">
          logged in as {{ $auth.user.username }}
        </div>
        <div class="mx-2" index="logout">
          Logout
        </div>
      </div>
    </div>
  </el-menu>
<!--   <el-menu
    :default-active="activeIndex"
    class="flex bg-slate-600"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="dashboard">
      Dashboard
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        Utility
      </template>
      <el-menu-item index="currency">
        Currency
      </el-menu-item>
      <el-menu-item index="asset-category">
        Asset Category
      </el-menu-item>
      <el-menu-item index="asset-subcategory">
        Asset SubCategory
      </el-menu-item>
      <el-menu-item index="category-of-depreciation">
        Category of Depreciation
      </el-menu-item>
      <el-menu-item index="location">
        location
      </el-menu-item>
      <el-menu-item index="adjustment-asset">
        Adjustment Asset
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="Asset">
      Asset
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        Report
      </template>
      <el-menu-item index="AssetSummary">
        Asset Summary
      </el-menu-item>
      <el-menu-item index="AssetSummarySub">
        Asset Summary Sub
      </el-menu-item>
      <el-menu-item index="AssetAll">
        Asset All
      </el-menu-item>
      <el-menu-item index="AssetAllDetail">
        Asset All Detail
      </el-menu-item>
      <el-menu-item index="AssetAllMonth">
        Asset All Month
      </el-menu-item>
      <el-menu-item index="AssetFinancial">
        Asset Financial
      </el-menu-item>
      <el-menu-item index="AssetDisposal">
        Asset Disposal
      </el-menu-item>
      <el-menu-item index="AssetDisposalDetail">
        Asset Disposal Detail
      </el-menu-item>
      <el-menu-item index="AssetLabeling">
        Asset Labeling
      </el-menu-item>
      <el-menu-item index="AssetAllocation">
        Asset Allocation
      </el-menu-item>
    </el-submenu>
    <el-submenu v-if="$auth.user.roleId === 2" index="5">
      <template slot="title">
        User Data
      </template>
      <el-menu-item index="dapartment">
        Dapartement
      </el-menu-item>
      <el-menu-item index="section">
        Section
      </el-menu-item>
      <el-menu-item index="role-user">
        Role
      </el-menu-item>
      <el-menu-item index="management-user">
        Management User
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="change-password">
      Change Password
    </el-menu-item>
    <el-menu-item style="margin-left: 400px;">
      logged in as {{ $auth.user.username }}
    </el-menu-item>
    <el-menu-item index="logout" style="justify-content: end; align-items: center;">
      Logout
    </el-menu-item>
  </el-menu> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      activeIndex: 'dapartement',
      open: false
    }
  },

  computed: {
    ...mapGetters({
      user: ['auth/getUser']
    })
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchMe()
      } catch (error) {
        this.$message({
          title: 'error',
          message: error,
          type: 'error'
        })
      }
    }
  },

  methods: {
    ...mapActions('auth', ['fetchMe', 'fetchLogout']),
    async handleSelect (key, keyPath) {
      if (key === 'logout') {
        await this.$auth.logout()
      } else { this.$router.push(key, keyPath) }
    }
  }
}
</script>