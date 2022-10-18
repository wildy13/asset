<template>
  <el-menu
    :default-active="activeIndex"
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
      <div>
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
      </div>
    </el-submenu>
    <el-menu-item index="Asset">
      Asset
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        Report
      </template>
      <div>
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
      </div>
    </el-submenu>
    <el-submenu v-if="$auth.user.roleId === 2" index="5">
      <template slot="title">
        User Data
      </template>
      <div>
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
      </div>
    </el-submenu>
    <el-menu-item index="change-password">
      Change Password
    </el-menu-item>
    <div class="flex w-full justify-end">
      <div>
        <el-menu-item>
          logged in as {{ $auth.user.username }}
        </el-menu-item>
      </div>
      <div>
        <el-menu-item index="logout">
          Logout
        </el-menu-item>
      </div>
    </div>
  </el-menu>
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