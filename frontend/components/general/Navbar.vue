<template>
  <div>
    <div>
      <el-col :span="5">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <div class="text-white text-2xl text-center">
            DASHBOARD | Labtech
          </div>
          <el-menu-item index="dashboard">
            <i class="el-icon-menu"></i>
            <span>Dashboard</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>Utility</span>
            </template>
            <el-menu-item-group>
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
                Location
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item index="adjustment-asset">
              Adjustment Asset
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="Asset">
            <i class="el-icon-menu"></i>
            <span>Asset</span>
          </el-menu-item>
          <!--<el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span>Navigator Three</span>
          </el-menu-item> -->
          <el-submenu v-if="$auth.user.roleId === 1" index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>User Management</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="dapartment">
                Dapartment
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
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="change-password">
            <i class="el-icon-setting"></i>
            <span>Change Passowrd</span>
          </el-menu-item>
          <el-menu-item index="logout">
            <i class="el-icon-setting"></i>
            <span>Logout</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 'dashboard',
      open: false
    }
  },

  methods: {
    async handleSelect (key, keyPath) {
      if (key === 'logout') {
        await this.$auth.logout()
      } else { this.$router.push(key, keyPath) }
    }
  }
}
</script>