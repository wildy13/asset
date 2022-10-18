<template>
  <el-container>
    <div class="w-full">
      <div class="flex justify-between mt-2 w-full">
        <div class="flex">
          <!-- Add Button -->
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">
            Add Sub Category
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
            class=" placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-gray-800 focus:ring-1 sm:text-sm "
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
          <el-table-column label="Category Code" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? categoryCode[scope.row.categoryId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column label="Category Name" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? categoryId[scope.row.categoryId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column prop="subcategoryCode" label="Sub Code" />
          <el-table-column prop="name" label="Sub Name" />
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
          :total="subcategoryData.length"
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
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="Asset Category" prop="categoryId">
              <el-select v-model="form.categoryId" @change="handleCategoryChange">
                <el-option
                  v-for="item in selectDataCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Code " prop="categoryCodeId">
              <el-select v-model="form.categoryId">
                <el-option
                  v-for=" item in selectDataCategory"
                  :key="item.id"
                  :label="item.categoryCode"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Sub Code">
              <el-input
                v-model="form.subcategoryCode"
              />
            </el-form-item>
            <el-form-item label="Sub Name">
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
        title="Input Sub-Category"
        :visible.sync="dialogVisible1"
      >
        <span>
          <el-form ref="formEdit" :model="formEdit" :rules="rules">
            <el-form-item label="Asset Category" prop="categoryId">
              <el-select v-model="formEdit.categoryId">
                <el-option
                  v-for="item in selectDataCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Sub Code">
              <el-input
                v-model="formEdit.subcategoryCode"
              />
            </el-form-item>
            <el-form-item label="Sub Name">
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
        subcategoryCode: '',
        categoryId: '',
        categoryCode: ''
      },
      categoryId: [''],
      categoryCode: [''],
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
        storeFields: ['name', 'subcategoryCode', 'categoryId', 'categoryCodeId', 'createdAt', 'updatedAt']
      }),
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        subcategoryCode: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        categoryId: [
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
        subcategoryCode: '',
        categoryId: '',
        categoryCode: ''
      }
    }
  },
  computed: {
    ...mapState('subcategory', ['loading']),
    ...mapGetters({
      loading: ['subcategory/getLoading'],
      subcategoryData: ['subcategory/getSubCategory'],
      selectDataCategory: ['category/getCategory'],
      selectDataSubCategory: ['subcategory/getSubCategory']
    }),
    pageTableData () {
      if (this.search) {
        return this.miniSearch.search(this.search, { prefix: true }).slice(0, this.pageSize)
      }
      return this.subcategoryData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },

  async created () {
    if (process.browser) {
      try {
        await this.getSubCategory()
        await this.fetchCategory()
        this.miniSearch.addAll(this.subcategoryData)
        this.categoryId.push(...this.selectDataCategory.map(value => value.name))
        this.categoryCode.push(...this.selectDataCategory.map(value => value.categoryCode))
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
    ...mapActions('subcategory', ['inputSubCategory', 'getSubCategory', 'fetchSubCategory', 'fetchDel', 'fetchEdit']),
    ...mapActions('category', ['fetchCategory']),
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
        this.inputSubCategory({
          name: this.form.name,
          subcategoryCode: this.form.subcategoryCode,
          categoryId: this.form.categoryId
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
          subcategoryCode: this.formEdit.subcategoryCode,
          categoryId: this.formEdit.categoryId
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
    async  handleCategoryChange (id) {
      await this.fetchSubCategory({ id })
    }
  }
}
</script>
