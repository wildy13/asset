<template>
  <div class="flex bg-slate-600 bg-blend-multiply  min-h-screen justify-center items-center">
    <div class=" grid grid-cols-2 w-1/2 justify-center items-center rounded-md shadow-2xl h-96">
      <div class="h-full bg-slate-200 justify-center items-center flex">
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
              <input v-model="form.username" size="large" placeholder="Username" class="placeholder:text-slate-400 text-center bg-white border-slate-400 rounded-md  pl-9 pr-3 shadow-sm" />
            </el-form-item>
          </div>
          <div class="floating-input mb-5 relative">
            <el-form-item prop="password">
              <input
                v-model="form.password"
                size="large"
                type="password"
                placeholder="Password"
                class="placeholder:text-slate-400 text-center bg-white border-slate-400 rounded-md  pl-9 pr-3 shadow-sm"
              />
            </el-form-item>
          </div>
          <div class="bg-slate-900 flex justify-center pl-9 pr-3 rounded-md">
            <button type="primary" native-type="submit" class="justify-center text-white font-serif">
              Log in
            </button>
          </div>
        </el-form>
      </div>
      <div class="h-full">
        <img src="../../assets/img/assets.jpg" alt="" class="h-full">
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
