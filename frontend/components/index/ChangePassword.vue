<template>
  <el-container class=" w-screen">
    <div class="w-center">
      <el-form :ref="form" :model="form" :rules="rules" @submit.native.prevent="changePassword()">
        <el-form-item label="Old Password" prop="password">
          <el-input v-model="form.oldPass" show-password class="input-length" />
        </el-form-item>
        <el-form-item label="New Password" prop="password">
          <el-input v-model="form.newPass" show-password />
        </el-form-item>
        <el-form-item label="Confirm New Password" prop="password">
          <el-input v-model="form.confirmPass" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit">
          save
        </el-button>
      </el-form>
    </div>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        oldPass: ''
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

    changePassword () {
      try {
        this.changePassword({
          password: this.form.oldPass
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
