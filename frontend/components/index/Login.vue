<template>
  <div class="min-h-screen grid grid-cols-3 bg-img">
    <div></div>
    <div class="grid grid-cols-1 content-center lg:px-18 xl:px-32 2xl:px-30">
      <div class="text-3xl font-bold text-center text-blue-600">
        Asset Data System
      </div>

      <div class="grid grid-cols-1 gap-y-2 my-8 text-black-500 text-center">
        <div>Please login with your credentials</div>
      </div>

      <IndexErrorHandler
        v-if="error"
        :error="error"
      />

      <div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          :hide-required-asterisk="true"
          label-position="top"
          @submit.native.prevent="submitForm('form')"
        >
          <div class="floating-input mb-5 relative">
            <el-form-item prop="username">
              <el-input v-model="form.username" size="large" placeholder="Username"></el-input>
            </el-form-item>
          </div>
          <div class="floating-input mb-5 relative">
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                size="large"
                show-password
                placeholder="Password"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" size="large" native-type="submit" class="w-full">
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="flex justify-center space-x-2">
        <div class="text-white">
          Version
          <a href="" class="font-bold text-blue-600">1.0.0</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ]
      },
      error: ''
    }
  },

  methods: {
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            await this.$auth.loginWith('local', { data: this.form })
          } catch ({ response: { data } }) {
            this.error = data
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
