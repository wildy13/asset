<template>
  <el-container>
    <div class="w-full">
      <div class="flex justify-between mt-2 w-full">
        <div class="flex">
          <!-- Add Button -->
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">
            Add Category
          </el-button>

          <!-- Delete Button -->
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete">
            Delete
          </el-button>
        </div>
        <div>
          <!-- Search -->
          <input
            v-model="search"
            class=" placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-gray-800 focus:ring-1 sm:text-sm mr-4"
            placeholder="search data in Here"
          />
        </div>
      </div>
      <div>
        <el-table
          :data="pageTableData"
          layout="prev, pager, next "
          :total="1000"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" />
          <el-table-column type="index" label="No" />
          <el-table-column prop="categoryCode" label="Code" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="createdAt" label="Created At" />
          <el-table-column prop="updatedAt" label="Updated At" />
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row), dialogVisible1 = true"
              >
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total, sizes, prev, pager, next"
          :current-page="page"
          :total="categoryData.length"
          :page-size="pageSize"
          :pager-count="pagerCount"
          :page-sizes="pageSizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- Add Dialog -->
      <el-dialog
        title="Input Category"
        :visible.sync="dialogVisible"
      >
        <span>
          <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="Code">
              <el-input
                v-model="form.categoryCode"
                type="number"
              />
            </el-form-item>
            <el-form-item label="Name">
              <el-input
                v-model="form.name"
              />
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSave">Save</el-button>
        </span>
      </el-dialog>
      <!-- End of add dialog -->
      <!-- Edit Dialog -->
      <el-dialog
        title="Input Role-based"
        :visible.sync="dialogVisible1"
      >
        <span>
          <el-form ref="formEdit" :model="formEdit" label-width="100px" :rules="rules">
            <el-form-item label="Code">
              <el-input
                v-model="formEdit.categoryCode"
                type="number"
              />
            </el-form-item>
            <el-form-item label="Name">
              <el-input
                v-model="formEdit.name"
              />
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="editForm">Save</el-button>
        </span>
      </el-dialog>
      <!-- end of edit dialog -->
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
      activeIndex: 'currency',
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        name: '',
        categoryCode: ''
      },
      page: 1,
      pageSize: 5,
      pagerCount: 5,
      pageSizes: [5, 10, 20, 50],
      search: '',
      filtered: [],
      multipleSelection: [],
      miniSearch: new MiniSearch({
        idField: ['id'],
        fields: ['name'],
        storeFields: ['name', 'currencyCode', 'currencySymbol', 'createdAt', 'updatedAt']
      }),
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        categoryCode: [
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
        name: '',
        categoryCode: ''
      }
    }
  },
  computed: {
    ...mapState('category', ['loading']),
    ...mapGetters({
      loading: ['category/getLoading'],
      categoryData: ['category/getCategory']
    }),
    pageTableData () {
      if (this.search) {
        return this.miniSearch.search(this.search, { prefix: true }).slice(0, this.pageSize)
      }
      return this.categoryData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchCategory()
        this.miniSearch.addAll(this.categoryData)
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
    ...mapActions('category', ['inputCategory', 'fetchCategory', 'fetchDel', 'fetchEdit']),
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.page = val
    },
    handleSelect (key, keyPath) {
      this.$router.push(key, keyPath)
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
            message: 'Changes saved. Proceeding to a new route.'
          })
        })
        .catch((action) => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? 'Changes discarded. Proceeding to a new route.'
              : 'Stay in the current route'
          })
        })
    },
    onSave () {
      try {
        this.inputCategory({
          name: this.form.name,
          categoryCode: this.form.categoryCode
        })
        this.$message({
          title: 'success',
          message: 'You did it',
          type: 'success'
        })
        this.dialogVisible = false
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
    async editForm () {
      try {
        this.dialogVisible1 = true
        await this.fetchEdit({
          id: this.formEdit.id,
          name: this.formEdit.name,
          categoryCode: this.formEdit.categoryCode
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
    }
  }
}
</script>
