<template>
  <div>
    <div>
      <div class="flex w-full justify-center">
        <div class="font-sans font-medium">
          Change Password
        </div>
      </div>
      <div class="text-center font-sans font-light">
        You will be force to logout after change
      </div>
    </div>
    <div class="flex w-full justify-center">
      <div class="mt-4">
        <el-form
          :ref="form"
          :model="form"
          :rules="rules"
        >
          <div>
            <div>
              <el-form-item label="Old Password" :label-width="formLabelWidth">
                <el-input v-model="form.oldPass" placeholder="Old Password" type="password" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="New Password" :label-width="formLabelWidth">
                <el-input v-model="form.newPass" placeholder="New Password" type="password" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="Re-New Password" :label-width="formLabelWidth">
                <el-input v-model="form.confNewPass" placeholder="Re-New Password" type="password" />
              </el-form-item>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                class="w-full"
                @click="onSave"
              >
                Save
              </el-button>
            </span>
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
      formLabelWidth: '200px',
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
  methods: {
    ...mapActions('users', ['changePassword']),

    async onSave () {
      try {
        await this.changePassword({
          id: this.$auth.user.id,
          oldPass: this.form.oldPass,
          newPass: this.form.newPass,
          confNewPass: this.form.confNewPass
        })
        this.$auth.logout()
      } catch ({ response: { data } }) {
        if (data) {
          this.$message({
            title: 'error',
            message: data,
            type: 'error'
          })
        }
      }
    }
  }
}
</script>
