<template>
  <div>
    <div class="flex justify-center ">
      <el-card class="box-card">
        <div v-for="(user, index) in users" :key="index" class="text item">
          <div class="text-lg">
            Total Users
          </div>
          <div class="text-2xl">
            {{ user }}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div v-for="(role, index) in roles" :key="index" class="text item">
          <div class="text-lg">
            Total Roles
          </div>
          <div class="text-2xl">
            {{ role }}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div v-for="(dapartment, index) in dapartments" :key="index" class="text item">
          <div class="text-lg">
            Total Dapartments
          </div>
          <div class="text-2xl">
            {{ dapartment }}
          </div>
        </div>
      </el-card>      <el-card class="box-card">
        <div v-for="(section, index) in sections" :key="index" class="text item">
          <div class="text-lg">
            Total Sections
          </div>
          <div class="text-2xl">
            {{ section }}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div v-for="(asset, index) in assets" :key="index" class="text item">
          <div class="text-lg">
            Total Assets
          </div>
          <div class="text-2xl">
            {{ asset }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      users: [],
      roles: [],
      dapartments: [],
      sections: [],
      assets: []
    }
  },

  computed: {
    ...mapState('users', ['loading']),
    ...mapState('roles', ['loading']),
    ...mapState('logout', ['loading']),
    ...mapGetters({
      loading: ['users/getLoading'],
      usersData: ['users/getUsers'],
      rolesData: ['roles/getRoles'],
      sectionsData: ['section/getSections'],
      DapartementsData: ['dapartment/getDapartments'],
      AssetsData: ['assets/getAssets']
    })
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchUsers()
        await this.fetchRoles()
        await this.fetchDapartment()
        await this.getSection()
        await this.fetchAssets()

        const user = Math.floor(this.usersData.length)
        this.users.push(user)

        const role = Math.floor(this.rolesData.length)
        this.roles.push(role)

        const dapartment = Math.floor(this.DapartementsData.length)
        this.dapartments.push(dapartment)

        const section = Math.floor(this.sectionsData.length)
        this.sections.push(section)

        const asset = Math.floor(this.AssetsData.length)
        this.assets.push(asset)
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
    ...mapActions('users', ['fetchUsers']),
    ...mapActions('roles', ['fetchRoles']),
    ...mapActions('dapartment', ['fetchDapartment']),
    ...mapActions('section', ['getSection']),
    ...mapActions('assets', ['fetchAssets'])
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    margin: 10px;
  }

  .el-card {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
    --tw-gradient-from: #0ea5e9;
    --tw-gradient-to: rgb(14 165 233 / 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    --tw-gradient-to: #6366f1;
    color: white;
  }
</style>