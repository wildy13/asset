<template>
  <div
    class="min-h-screen grid grid-cols-3 2xl:grid-cols-5 items-center bg-img"
  >
    <div class="flex flex-col space-y-8 col-start-2 2xl:col-start-3">
      <div class="text-2xl text-center font-bold text-blue-600">
        User Register
      </div>
      <IndexErrorHandler v-if="error" :error="error" />

      <IndexSuccessHandler v-if="success" :message="success" />

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :hide-required-asterisk="true"
        label-position="top"
        @submit.native.prevent="submitForm('form')"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" label="Username" />
        </el-form-item>
        <div class="flex flex-wrap -mx-2 mb-2">
          <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <el-form-item label="Password" prop="password">
              <el-input v-model="form.password" show-password />
            </el-form-item>
          </div>
          <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <el-form-item label="Confirm Password" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" show-password />
            </el-form-item>
          </div>
        </div>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Dapartement  " prop="dapartement">
          <el-input v-model="form.dapartement" />
        </el-form-item>
        <el-form-item label="Section" prop="section">
          <el-input v-model="form.section" />
        </el-form-item>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <el-form-item label="Role" prop="roleId">
              <el-select v-model="form.roleId">
                <el-option
                  v-for="item in selectData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <el-form-item label="Employee No" prop="employeeNo">
              <el-input v-model="form.employeeNo" />
            </el-form-item>
          </div>
        </div>
        <div class="mt-12">
          <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
            class="w-full"
          >
            Save
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('This field is required'))
      } else if (value !== this.form.password) {
        callback(new Error('Password not match!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        roleId: '',
        section: '',
        dapartement: '',
        employeeNo: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        section: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        dapartement: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        employeeNo: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        confirmPassword: [{ validator: validatePassword, trigger: 'blur' }]
      },
      error: '',
      success: ''
    }
  },

  computed: {
    ...mapGetters({
      selectData: ['roles/getRoles']
    })
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchRoles()
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
    ...mapActions('users', ['createUser']),
    ...mapActions('roles', ['fetchRoles']),
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            this.error = ''
            await this.createUser(this.form)
            this.success =
              'Successfully create user, please login with your credentials'
            this.loading = false
            return true
          } catch ({ response: { data } }) {
            this.error = data
            this.success = ''
            this.loading = false
            return false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
