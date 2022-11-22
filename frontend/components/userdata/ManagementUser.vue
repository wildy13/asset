<template>
  <el-container>
    <div class="w-full">
      <div class="flex justify-between mt-2 w-full">
        <div class="flex">
          <!-- Add Button -->
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="dialogVisible = true"
          >
            Add User
          </el-button>

          <!-- Delete Button -->
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete">
            Delete
          </el-button>
        </div>

        <!-- Search -->
        <div>
          <input
            v-model="search"
            class="placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-gray-800 focus:ring-1 sm:text-sm"
            placeholder="search data in Here"
          />
        </div>
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
          <el-table-column type="selection" />
          <el-table-column type="index" label="No" class="table-col" />l
          <el-table-column prop="employeeNo" width="180" label="Employee Number" />
          <el-table-column prop="username" label="Name" />
          <el-table-column prop="email" label="Email" class="table-col" />
          <el-table-column label="Dapartment" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? dapartementId[scope.row.dapartementId] : "error" }}
            </template>
          </el-table-column>
          <el-table-column label="Section" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? sectionId[scope.row.sectionId] : "error" }}
            </template>
          </el-table-column>
          <el-table-column label="Role" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? roles[scope.row.roleId] : "error" }}
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row), (dialogVisible1 = true)"
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- Add User Dialog -->
      <div class="grid grid-cols-1">
        <el-dialog title="Input user" :visible.sync="dialogVisible">
          <span class="col-start-1">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              :hide-required-asterisk="true"
              label-width="130px"
              @submit.native.prevent="submitForm('form')"
            >
              <div class="flex">
                <div>
                  <el-form-item prop="username" label="Username">
                    <el-input
                      v-model="form.username"
                      label="Username"
                      placeholder="Username"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item prop="email" label="Email">
                    <el-input v-model="form.email" placeholder="Email" />
                  </el-form-item>
                </div>
              </div>
              <div class="flex">
                <div>
                  <el-form-item prop="password" label="Password">
                    <el-input
                      v-model="form.password"
                      show-password
                      placeholder="Password"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item prop="confirmPassword" label="Confirm Password">
                    <el-input
                      v-model="form.confirmPassword"
                      show-password
                      placeholder="Confirm Password"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="flex justify-between">
                <div>
                  <el-form-item prop="dapartmentId" label="Dapartment">
                    <el-select
                      v-model="form.dapartementId"
                      placeholder="Dapartement"
                      @change="handleDapartementChange"
                    >
                      <el-option
                        v-for="item in selectDataDapartment"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item prop="sectionId" label="Section">
                    <el-select
                      v-model="form.sectionId"
                      placeholder="Section"
                    >
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
              <div class="flex">
                <div>
                  <el-form-item prop="employeeNo" label="Employee No">
                    <el-input
                      v-model="form.employeeNo"
                      placeholder="Employee No"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-form-item prop="roleId" label="Role">
                    <el-select
                      v-model="form.roleId"
                      placeholder="Role"
                    >
                      <el-option
                        v-for="item in selectDataRole"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
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
      </div>
      <!-- end of Add Dialog -->

      <!-- Edit User Dialog -->
      <el-dialog title="Input user" :visible.sync="dialogVisible1">
        <span>
          <el-form
            ref="formEdit"
            :model="formEdit"
            :rules="rules"
            :hide-required-asterisk="true"
            label-width="130px"
            @submit.native.prevent="editForm()"
          >
            <div class="flex">
              <div>
                <el-form-item prop="username" label="Username">
                  <el-input
                    v-model="formEdit.username"
                    placeholder="Username"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item prop="email" label="Email">
                  <el-input v-model="formEdit.email" placeholder="Email" />
                </el-form-item>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <el-form-item prop="dapartmentId" label="Dapartment">
                  <el-select
                    v-model="formEdit.dapartementId"
                    placeholder="Dapartement"
                    @change="handleDapartementChange"
                  >
                    <el-option
                      v-for="item in selectDataDapartment"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item prop="sectionId" label="Section">
                  <el-select
                    v-model="formEdit.sectionId"
                    placeholder="Section"
                  >
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
            <div class="w-max">
              <el-form-item prop="roleId" label="Role">
                <el-select
                  v-model="formEdit.roleId"
                  placeholder="Role"
                >
                  <el-option
                    v-for="item in selectDataRole"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
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
      form: {
        username: '',
        employeeNo: '',
        email: '',
        dapartementId: '',
        sectionId: '',
        password: '',
        confirmPassword: '',
        roleId: ''
      },
      activeIndex: 'ManagementUser',
      roles: [''],
      dapartementId: [''],
      sectionId: [''],
      page: 1,
      pageSize: 5,
      pagerCount: 5,
      pageSizes: [5, 10, 20, 50],
      search: '',
      filtered: [],
      multipleSelection: [],
      miniSearch: new MiniSearch({
        idField: ['id'],
        fields: ['username', 'employeeNo', 'dapartementId'],
        storeFields: [
          'username',
          'employeeNo',
          'email',
          'dapartementId',
          'sectionId',
          'roleId'
        ]
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
        sectionId: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        dapartementId: [
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
        dapartementId: '',
        sectionId: '',
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
        return this.miniSearch
          .search(this.search, { prefix: true })
          .slice(0, this.pageSize)
      }
      return this.usersData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      )
    }
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchUsers()
        this.miniSearch.addAll(this.usersData)
        await this.fetchRoles()
        await this.fetchDapartment()
        await this.getSection()
        this.roles.push(...this.selectDataRole.map(value => value.name))
        this.dapartementId.push(
          ...this.selectDataDapartment.map(value => value.name)
        )
        this.sectionId.push(
          ...this.selectDataSection.map(value => value.name)
        )
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
    ...mapActions('users', [
      'fetchUsers',
      'createUser',
      'fetchDel',
      'fetchEdit'
    ]),
    ...mapActions('roles', ['fetchRoles']),
    ...mapActions('dapartment', ['fetchDapartment']),
    ...mapActions('section', ['fetchSection', 'getSection']),
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
            message:
              'Changes saved. Proceeding to a new route, Please refresh browser for New Data.'
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
          sectionId: this.formEdit.sectionId,
          dapartementId: this.formEdit.dapartementId,
          roleId: this.formEdit.roleId,
          employeeNo: this.formEdit.employeeNo
        })
        this.dialogVisible1 = false
      } catch (error) {
        if (error.response) {
          this.$message({
            title: 'error',
            message: error.response.data.msg,
            type: 'error'
          })
        }
      }
    },
    async handleDapartementChange (id) {
      await this.fetchSection({ id })
    }
  }
}
</script>
