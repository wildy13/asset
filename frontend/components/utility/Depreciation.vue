<template>
  <el-container>
    <div class="w-full">
      <div class="flex justify-between mt-2 w-full">
        <div class="flex">
          <!-- Add Button -->
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">
            Add C.O.D
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
          <el-table-column label="Category Name" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? categoryId[scope.row.categoryId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column label="Sub Category Name" class="table-col">
            <template slot-scope="scope">
              {{ subcategoryId[scope.row.subcategoryId] }}
            </template>
          </el-table-column>
          <el-table-column prop="method" label="Method Name" />
          <el-table-column prop="type" label="Group Type" />
          <el-table-column label="Rate">
            <template slot-scope="scope">
              {{ scope.row.rate }} %
            </template>
          </el-table-column>
          <el-table-column label="Rate">
            <template slot-scope="scope">
              {{ scope.row.year }} Year
            </template>
          </el-table-column>
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
          :total="depreciationData.length"
          :page-size="pageSize"
          :pager-count="pagerCount"
          :page-sizes="pageSizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- Add Dialog -->
      <el-dialog
        title="Input C.O.D"
        :visible.sync="dialogVisible"
      >
        <span>
          <el-form ref="form" :model="form" label-width="130px" :rules="rules">
            <el-form-item label="Category Name " prop="categoryId">
              <el-select v-model="form.categoryId" @change="handleCategoryChange">
                <el-option
                  v-for=" item in selectDataCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Sub Category " prop="subcategoryId">
              <el-select v-model="form.subcategoryId">
                <el-option
                  v-for=" item in selectDataSubCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Type Asset " prop="type">
              <el-select v-model="form.type">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Methode " prop="method">
              <el-select v-model="form.method">
                <el-option
                  v-for="item in method"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Rate">
              <el-input
                v-model="form.rate"
              />
            </el-form-item>
            <el-form-item label="Life">
              <el-input
                v-model="form.year"
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
          <el-form ref="formEdit" :model="formEdit"  label-width="130px" :rules="rules">
            <el-form-item label="Category Name " prop="categoryId">
              <el-select v-model="formEdit.categoryId">
                <el-option
                  v-for=" item in selectDataCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Sub Category " prop="subcategoryId">
              <el-select v-model="formEdit.subcategoryId">
                <el-option
                  v-for=" item in selectDataSubCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Type Asset " prop="type">
              <el-select v-model="formEdit.type">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Methode " prop="method">
              <el-select v-model="formEdit.method">
                <el-option
                  v-for="item in method"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Rate">
              <el-input
                v-model="formEdit.rate"
              />
            </el-form-item>
            <el-form-item label="Life">
              <el-input
                v-model="formEdit.year"
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
      type: [
        {
          value: 'Bangunan',
          label: 'Bangunan'
        },
        {
          value: 'Non Bangunan',
          label: 'Non Bangunan'
        }
      ],
      method: [
        {
          value: 'Straight Line',
          label: 'Straight Line'
        }
      ],
      activeIndex: 'currency',
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        type: '',
        rate: '',
        year: '',
        categoryId: '',
        subcategoryId: '',
        method: ''
      },
      page: 1,
      pageSize: 5,
      pagerCount: 5,
      pageSizes: [5, 10, 20, 50],
      search: '',
      filtered: [],
      categoryId: [''],
      subcategoryId: [''],
      multipleSelection: [],
      miniSearch: new MiniSearch({
        idField: ['id'],
        fields: ['name'],
        storeFields: ['name', 'currencyCode', 'currencySymbol', 'createdAt', 'updatedAt']
      }),
      rules: {
        rate: [
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
        subcategoryId: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        method: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        year: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        type: [
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
        type: '',
        rate: '',
        year: '',
        categoryId: '',
        subcategoryId: '',
        method: ''
      }
    }
  },
  computed: {
    ...mapState('depreciation', ['loading']),
    ...mapGetters({
      loading: ['depreciation/getLoading'],
      depreciationData: ['depreciation/getDepreciation'],
      selectDataCategory: ['category/getCategory'],
      selectDataSubCategory: ['subcategory/getSubCategory']
    }),
    pageTableData () {
      if (this.search) {
        return this.miniSearch.search(this.search, { prefix: true }).slice(0, this.pageSize)
      }
      return this.depreciationData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchDepreciation()
        await this.fetchCategory()
        await this.getSubCategory()
        this.miniSearch.addAll(this.depreciationData)
        this.categoryId.push(...this.selectDataCategory.map(value => value.name))
        this.subcategoryId.push(...this.selectDataSubCategory.map(value => value.name))
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
    ...mapActions('depreciation', ['inputDepreciation', 'fetchDepreciation', 'fetchDel', 'fetchEdit']),
    ...mapActions('category', ['fetchCategory']),
    ...mapActions('subcategory', ['fetchSubCategory', 'getSubCategory']),
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
        this.inputDepreciation({
          categoryId: this.form.categoryId,
          subcategoryId: this.form.subcategoryId,
          type: this.form.type,
          rate: this.form.rate,
          year: this.form.year,
          method: this.form.method

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
          categoryId: this.formEdit.categoryId,
          subcategoryId: this.formEdit.subcategoryId,
          type: this.formEdit.type,
          rate: this.formEdit.rate,
          year: this.formEdit.year,
          method: this.formEdit.method
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
