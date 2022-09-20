<template>
  <el-container>
    <div>
      <div class="flex justify-between  mt-2">
        <!-- Add Button -->
        <el-button type="primary" @click="dialogVisible = true">
          Add C.O.D
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
          <el-table-column label="Category Name" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? categoryId[scope.row.categoryId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column label="Sub Category Name" class="table-col">
            <template slot-scope="scope">
              {{ scope.row ? subcategoryId[scope.row.categoryId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column prop="method" label="Method Name" />
          <el-table-column prop="type" label="Group Type" />
          <el-table-column prop="rate" label="Rate" />
          <el-table-column prop="life" label="Life" />
          <el-table-column prop="creatDedAt" label="Created At" />
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
          style="margin-left: 1400px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- Add Dialog -->
      <el-dialog
        title="Input C.O.D"
        :visible.sync="dialogVisible"
        width="30.7%"
      >
        <span>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="Category Name " prop="categoryId" :label-width="formLabelWidth">
              <el-select v-model="form.categoryId">
                <el-option
                  v-for=" item in selectDataCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Sub Category " prop="subcategoryId" :label-width="formLabelWidth">
              <el-select v-model="form.subcategoryId">
                <el-option
                  v-for=" item in selectDataSubCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Type Asset " prop="type" :label-width="formLabelWidth">
              <el-select v-model="form.type">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Methode " prop="method" :label-width="formLabelWidth">
              <el-select v-model="form.method">
                <el-option
                  v-for="item in method"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Rate" :label-width="formLabelWidth">
              <el-input
                v-model="form.rate"
              />
            </el-form-item>
            <el-form-item label="Life" :label-width="formLabelWidth">
              <el-input
                v-model="form.life"
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
        width="30.7%"
      >
        <span>
          <el-form ref="formEdit" :model="formEdit" :rules="rules">
            <el-form-item label="Category Name " prop="categoryId" :label-width="formLabelWidth">
              <el-select v-model="formEdit.categoryId">
                <el-option
                  v-for=" item in selectDataCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Sub Category " prop="subcategoryId" :label-width="formLabelWidth">
              <el-select v-model="formEdit.subcategoryId">
                <el-option
                  v-for=" item in selectDataSubCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Type Asset " prop="type" :label-width="formLabelWidth">
              <el-select v-model="formEdit.type">
                <el-option>Bangunan</el-option>
                <el-option>Non Bangunan</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Methode " prop="method" :label-width="formLabelWidth">
              <el-select v-model="formEdit.method">
                <el-option>Straight Line</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Rate" :label-width="formLabelWidth">
              <el-input
                v-model="formEdit.rate"
              />
            </el-form-item>
            <el-form-item label="Life" :label-width="formLabelWidth">
              <el-input
                v-model="formEdit.life"
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
        life: '',
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
      formLabelWidth: '150px',
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
        life: [
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
        life: '',
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
        await this.fetchSubCategory()
        this.miniSearch.addAll(this.depreciationData)
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
    ...mapActions('subcategory', ['fetchSubCategory']),
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
          life: this.form.life,
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
          life: this.formEdit.life,
          method: this.formEdit.method
        })
        this.dialogVisible1 = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
