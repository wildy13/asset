<template>
  <div>
    <div>
      <div class="flex w-full justify-center">
        <div class="font-sans font-medium">
          Change Password
        </div>
      </div>
    </div>
    <div class="flex w-full justify-center">
      <div class="mt-4">
        <el-form
          :ref="form"
          :model="form"
          label-width="200px"
          :rules="rules"
          @submit.native.prevent="changePassword()"
        >
          <div>
            <div>
              <el-form-item label="Old Password">
                <el-input v-model="form.oldPass" placeholder="Old Password" type="password" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="New Password">
                <el-input v-model="form.newPass" placeholder="New Password" type="password" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="Re-New Password">
                <el-input v-model="form.confNewPass" placeholder="Re-New Password" type="password" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        oldPass: '',
        newPass: '',
        confNewPass: ''
      },
      rules: {
        oldPass: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        newPass: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        confirmPass: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  method: {
    ...mapActions('users', ['changePassword']),

    async changePassword () {
      try {
        await this.changePassword({
          password: this.form.newPass
        })
      } catch (error) {
        if (error.response) {
          this.$message({
            title: 'error',
            message: error.response.data.msg,
            type: 'error'
          })
        }
      }
    }
  }
}
</script>
