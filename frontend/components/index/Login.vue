<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="min-h-screen bg-slate-800">
    <div class="flex min-h-screen justify-center items-center">
      <div class="w-2/4">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          :hide-required-asterisk="true"
          label-position="top"
          @submit.native.prevent="submitForm('form')"
        >
          <div class="text-center text-white font-sans font-light">
            <div class="border-b border-white my-4">
              Asset System
            </div>
            <el-form-item prop="username">
              <input v-model="form.username" size="large" placeholder="Username" class="placeholder:text-slate-400 text-center bg-white  rounded-md w-full text-black " />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="password">
              <input
                v-model="form.password"
                size="large"
                type="password"
                placeholder="Password"
                class="placeholder:text-slate-400 text-center bg-white  rounded-md w-full text-black "
              />
            </el-form-item>
          </div>
          <div class="bg-slate-600 hover:bg-slate-400 rounded-md">
            <button type="primary" native-type="submit" class="justify-center text-white font-serif w-full">
              Log in
            </button>
          </div>
        </el-form>
      </div>
    </div>
  </div>

<!--   <div class="flex bg-slate-800 bg-blend-multiply  min-h-screen justify-center items-center">
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
          <div class="text-center mb-4 font-sans">
            <div class="text-xl border-b-2 border-slate-800">
              Asset System
            </div>
            <div class="text-lg">
              <div>
                <span>Login</span>
              </div>
            </div>
          </div>
          <div class="floating-input mb-5 relative">
            <el-form-item prop="username">
              <input v-model="form.username" size="large" placeholder="Username" class="placeholder:text-slate-400 text-center bg-white  rounded-md " />
            </el-form-item>
          </div>
          <div class="floating-input mb-5 relative">
            <el-form-item prop="password">
              <input
                v-model="form.password"
                size="large"
                type="password"
                placeholder="Password"
                class="placeholder:text-slate-400 text-center bg-white  rounded-md "
              />
            </el-form-item>
          </div>
          <div class="bg-slate-900 flex justify-centerrounded-md">
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
  </div> -->
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
            if (data) {
              this.$message({
                title: 'error',
                message: data,
                type: 'error'
              })
            }
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
