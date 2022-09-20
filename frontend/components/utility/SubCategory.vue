<template>
  <el-container>
    <div>
      <div class="flex justify-between  mt-2">
        <!-- Add Button -->
        <el-button type="primary" @click="dialogVisible = true">
          Add SubCategory
        </el-button>

        <!-- Delete Button -->
        <el-button type="danger" @click="handleDelete">
          Delete
        </el-button>

        <!-- Search -->
        <el-input
          v-model="search"
          class="ml-250  w-1"
          placeholder="search data in Here"
        />
      </div>
      <div>
        <el-table
          :data="pageTableData"
          layout="prev, pager, next "
          :total="1000"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="No" />
          <el-table-column label="Category Code" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? categoryCodeId[scope.row.categoryId] : 'error' }}
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
          style="margin-left: 1400px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- Add Dialog -->
      <el-dialog
        title="Input Category"
        :visible.sync="dialogVisible"
        width="30.7%"
      >
        <span>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="Asset Category" prop="categoryId" :label-width="formLabelWidth">
              <el-select v-model="form.categoryId">
                <el-option
                  v-for="item in selectDataCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Code " prop="categoryCodeId" :label-width="formLabelWidth">
              <el-select v-model="form.categoryId">
                <el-option
                  v-for=" item in selectDataCategory"
                  :key="item.id"
                  :label="item.categoryCode"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Sub Code" :label-width="formLabelWidth">
              <el-input
                v-model="form.subcategoryCode"
              />
            </el-form-item>
            <el-form-item label="Sub Name" :label-width="formLabelWidth">
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
        width="30.7%"
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
            <el-form-item label="Sub Code" :label-width="formLabelWidth">
              <el-input
                v-model="formEdit.subcategoryCode"
              />
            </el-form-item>
            <el-form-item label="Sub Name" :label-width="formLabelWidth">
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
        categoryId: ''
      },
      categoryId: [''],
      categoryCodeId: [''],
      page: 1,
      pageSize: 5,
      pagerCount: 5,
      pageSizes: [5, 10, 20, 50],
      search: '',
      filtered: [],
      multipleSelection: [],
      formLabelWidth: '150px',
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
        categoryCodeId: [
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
        categoryId: ''
      }
    }
  },
  computed: {
    ...mapState('subcategory', ['loading']),
    ...mapGetters({
      loading: ['subcategory/getLoading'],
      subcategoryData: ['subcategory/getSubCategory'],
      selectDataCategory: ['category/getCategory']
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
        await this.fetchSubCategory()
        await this.fetchCategory()
        this.miniSearch.addAll(this.subcategoryData)
        this.categoryId.push(...this.selectDataCategory.map(value => value.name))
        this.categoryCodeId.push(...this.selectDataCategory.map(value => value.categoryCode))
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
    ...mapActions('subcategory', ['inputSubCategory', 'fetchSubCategory', 'fetchDel', 'fetchEdit']),
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
          /* categoryCodeId: this.form.categoryId */
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
          /* categoryCodeId: this.formEdit.categoryId */
        })
        this.dialogVisible1 = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
