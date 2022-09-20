<template>
  <el-container>
    <div>
      <div class="flex justify-between  mt-2">
        <!-- Add Button -->
        <el-button type="primary" @click="dialogVisible = true">
          Add User
        </el-button>

        <!-- Delete Button -->
        <el-button type="danger" @click="handleDelete">
          Delete
        </el-button>

        <!-- Search -->
        <el-input
          v-model="search"
          class="ml-250  w-1"
          placeholder="search data Data in Here"
        />
      </div>
      <!-- Table  -->
      <div>
        <el-table
          ref="multipleTable"
          :data="pageTableData"
          class="tableUser"
          layout="prev, pager, next "
          :total="1000"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="No" class="table-col" />l
          <el-table-column
            prop="employeeNo"
            label="Employee Number"
          />
          <el-table-column prop="username" label="Name" />
          <el-table-column prop="email" label="Email" class="table-col" />
          <el-table-column label="Dapartment" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? dapartement[scope.row.dapartement] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column label="Section" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? section[scope.row.section] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column label="Role" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? roles[scope.row.roleId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row), dialogVisible1 =true"
              >
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- End of Table -->

        <!-- Pagination -->
        <el-pagination
          layout="total, sizes, prev, pager, next"
          :current-page="page"
          :total="usersData.length"
          :page-size="pageSize"
          :pager-count="pagerCount"
          :page-sizes="pageSizes"
          style="margin-left: 1400px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- Add User Dialog -->
      <el-dialog title="Input user" :visible.sync="dialogVisible" width="30.7%">
        <span>
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
            <div class="flex flex-wrap -mx-2 mb-2">
              <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <el-form-item label="Dapartment" prop="dapartment">
                  <el-select v-model="form.dapartement">
                    <el-option
                      v-for="item in selectDataDapartment"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <el-form-item label="Section" prop="section">
                  <el-select v-model="form.section">
                    <el-option
                      v-for="item in selectDataSection"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <el-form-item label="Role" prop="roleId">
                  <el-select v-model="form.roleId">
                    <el-option
                      v-for="item in selectDataRole"
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
        </span>
      </el-dialog>
      <!-- end of Add Dialog -->
      <!-- Edit User Dialog -->
      <el-dialog title="Input user" :visible.sync="dialogVisible1" width="30.7%">
        <span>
          <el-form
            ref="formEdit"
            :model="formEdit"
            :rules="rules"
            :hide-required-asterisk="true"
            label-position="top"
            @submit.native.prevent="editForm()"
          >
            <el-form-item label="Username" prop="username">
              <el-input v-model="formEdit.username" label="Username" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="formEdit.email"></el-input>
            </el-form-item>
            <div class="flex flex-wrap -mx-2 mb-2">
              <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <el-form-item label="Dapartement  " prop="dapartement">
                  <el-input v-model="formEdit.dapartement" />
                </el-form-item>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <el-form-item label="Section" prop="section">
                  <el-input v-model="formEdit.section" />
                </el-form-item>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <el-form-item label="Role" prop="roleId">
                  <el-select v-model="formEdit.roleId">
                    <el-option
                      v-for="item in selectDataRole"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <el-form-item label="Employee No" prop="employeeNo">
                  <el-input v-model="formEdit.employeeNo" />
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
        </span>
      </el-dialog>
      <!-- end of edit user dialog -->
    </div>
  </el-container>
</template>

<script>
import MiniSearch from 'minisearch'
import { mapState, mapGetters, mapActions } from 'vuex'

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
      dialogVisible: false,
      dialogVisible1: false,
      formLabelWidth: '150px',
      form: {
        username: '',
        employeeNo: '',
        email: '',
        dapartement: '',
        section: '',
        password: '',
        confPassword: '',
        roleId: ''
      },
      activeIndex: 'ManagementUser',
      roles: [''],
      dapartement: [''],
      section: [''],
      page: 1,
      pageSize: 5,
      pagerCount: 5,
      pageSizes: [5, 10, 20, 50],
      search: '',
      filtered: [],
      multipleSelection: [],
      miniSearch: new MiniSearch({
        idField: ['id'],
        fields: ['username', 'employeeNo', 'dapartement'],
        storeFields: ['username', 'employeeNo', 'email', 'dapartement', 'section', 'roleId']
      }),
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
      success: '',
      formEdit: {
        id: '',
        username: '',
        employeeNo: '',
        email: '',
        dapartement: '',
        section: '',
        password: '',
        confPassword: '',
        roleId: ''
      }
    }
  },
  computed: {
    ...mapState('users', ['loading']),
    ...mapState('roles', ['loading']),
    ...mapState('logout', ['loading']),
    ...mapGetters({
      loading: ['users/getLoading'],
      usersData: ['users/getUsers'],
      selectDataRole: ['roles/getRoles'],
      selectDataSection: ['section/getSections'],
      selectDataDapartment: ['dapartment/getDapartments']
    }),
    pageTableData () {
      if (this.search) {
        return this.miniSearch.search(this.search, { prefix: true }).slice(0, this.pageSize)
      }
      return this.usersData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchUsers()
        this.miniSearch.addAll(this.usersData)
        await this.fetchRoles()
        await this.fetchDapartment()
        await this.fetchSection()
        this.roles.push(...this.selectDataRole.map(value => value.name))
        this.dapartement.push(...this.selectDataDapartment.map(value => value.name))
        this.section.push(...this.selectDataSection.map(value => value.name))
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
    ...mapActions('users', ['fetchUsers', 'createUser', 'fetchDel', 'fetchEdit']),
    ...mapActions('roles', ['fetchRoles']),
    ...mapActions('dapartment', ['fetchDapartment']),
    ...mapActions('section', ['fetchSection']),
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.page = val
    },
    handleEdit (payload) {
      this.formEdit = { ...payload }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete () {
      this.$confirm('Are you sure for delete this data?', 'Confirm', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })
        .then(() => {
          this.fetchDel(this.multipleSelection)
          this.$message({
            type: 'info',
            message: 'Changes saved. Proceeding to a new route, Please refresh browser for New Data.'
          })
        })
        .catch((action) => {
          this.$message({
            type: 'info',
            message:
              action === 'cancel'
                ? 'Changes discarded. Proceeding to a new route.'
                : 'Stay in the current route'
          })
        })
    },
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            this.dialogVisible = true
            this.error = ''
            await this.createUser(this.form)
            this.$message({
              title: 'success',
              message: 'You did it',
              type: 'success'
            })
            this.dialogVisible = false
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
    },
    async editForm () {
      try {
        this.dialogVisible1 = true
        await this.fetchEdit({
          id: this.formEdit.id,
          username: this.formEdit.username,
          email: this.formEdit.email,
          section: this.formEdit.section,
          dapartement: this.formEdit.dapartement,
          roleId: this.formEdit.roleId,
          employeeNo: this.formEdit.employeeNo
        })
        this.dialogVisible1 = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
