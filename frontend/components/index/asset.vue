<template>
  <el-container>
    <div>
      <div class="flex justify-between  mt-2 ml-2">
        <!-- Add Button -->
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">
          Add Asset
        </el-button>

        <!-- Print Button -->
        <el-button type="primary" icon="el-icon-printer">
          Print
        </el-button>

        <!-- Tag Asset Button -->
        <el-button type="primary" icon="el-icon-printer">
          Tag Asset
        </el-button>

        <!-- Non Tag Button -->
        <el-button type="primary" icon="el-icon-printer">
          Non Tag
        </el-button>

        <!-- Search -->
        <el-input
          class="w-1 ml-500"
          placeholder="search data Data in Here"
        />
      </div>

      <!-- Table -->
      <div>
        <el-table
          ref="multipleTable"
          :data="pageTableData"
          class="tableUser"
          layout="prev, pager, next "
          :total="1000"
        >
          <el-table-column type="index" label="No" class="table-col" />l
          <el-table-column label="Category">
            <template slot-scope="scope">
              {{ scope.row ? categoryId[scope.row.categoryId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column label="Sub Category">
            <template slot-scope="scope">
              {{ scope.row ? subcategoryId[scope.row.subcategoryId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Asset Name" />
          <el-table-column prop="brandModel" label="Brand & Model" />
          <el-table-column prop="po" label="PO NO" />
          <el-table-column prop="condition" label="Condition" />
          <el-table-column prop="status" label=" Status" />
          <el-table-column prop="date" label="Date of Purchase" />
          <el-table-column label="OR CUR">
            <template slot-scope="scope">
              {{ scope.row ? currency[scope.row.currencyId] : 'error' }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="Cost" />
          <el-table-column label="Date Allocation">
            -
          </el-table-column>
          <el-table-column label="Tipe">
            T
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
      </div>

      <!-- add Dialog -->
      <el-dialog title="A. Detail Asset" :visible.sync="dialogVisible">
        <span>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            :hide-required-asterisk="true"
            label-position="top"
            @submit.native.prevent="submitForm('form')"
          >
            <div class="flex flex-wrap -mx-2 mb-2">
              <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <el-form-item label="Asset For" class=" flex">
                  <div class="ml-5">
                    <el-radio v-model="radio" label="1" class="block">Tax Assets</el-radio>
                  </div>
                  <div class="ml-5">
                    <el-radio v-model="radio" label="2" class="block">Non Tax Assets</el-radio>
                  </div>
                </el-form-item>
                <el-form-item label="Asset Name" prop="name" class="flex">
                  <el-input v-model="form.name" class="block ml-2 " />
                </el-form-item>
                <el-form-item label="Brand & Model" prop="brandModel" class="flex">
                  <el-input v-model="form.brandModel" type="textarea" :rows="2" placeholder="Please input Brand & Model" class="block ml-2" />
                </el-form-item>
                <el-form-item label="Asset Category" prop="categoryId" class="flex">
                  <el-select v-model="form.categoryId" class="block ml-2" @change="handleCategoryChange">
                    <el-option
                      v-for="item in selectDataCategory"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Sub Category " prop="subcategoryId" class="flex">
                  <el-select v-model="form.subcategoryId" class="block ml-2" @change="handleSubCategoryChange">
                    <el-option
                      v-for=" item in selectDataSubCategory"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Condition " prop="condition" class="flex">
                  <el-select v-model="form.condition" class="block ml-2">
                    <el-option
                      v-for="item in condition"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Status " prop="status" class="flex">
                  <el-select v-model="form.status" class="block ml-2">
                    <el-option
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Dapartment" prop="dapartmentId" class="flex">
                  <el-select v-model="form.dapartmentId" class="block ml-2" @change="handleDapartementChange">
                    <el-option
                      v-for="item in selectDataDapartment"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Section" prop="sectionId" class="flex">
                  <el-select v-model="form.sectionId" class="block ml-2">
                    <el-option
                      v-for="item in selectDataSection"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="PO No" prop="po" class="flex">
                  <el-input v-model="form.po" class="block ml-2 " />
                </el-form-item>
                <el-form-item label="Acquired Date" prop="date" class="flex">
                  <el-input v-model="form.date" type="date" class="block ml-2 " />
                </el-form-item>
                <el-form-item label="qty" prop="qty" class="flex">
                  <el-input v-model="form.qty" class="block ml-2 w-5" />
                </el-form-item>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <el-form-item label="Purchase Price" prop="currencyId" class="flex">
                  <el-select v-model="form.currencyId" class="block ml-2 w-5">
                    <el-option
                      v-for="item in selectDataCurrency"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                  <el-input v-model="form.price" class="block ml-2 w-50" />
                </el-form-item>
                <el-form-item label="Exchange Rate to USD" prop="exchange" class="flex">
                  <el-input v-model="form.exchange" class="block ml-2" placeholder="Input 1 For USD Currency" />
                </el-form-item>
                <b>B. Depreciation</b>
                <el-form-item label="Asset Non Depreciation" property="nonDepreciation" class="flex">
                  <el-checkbox v-model="checked" class="block ml-2" disabled />
                </el-form-item>
                <div>*This field will be checked if the category of asset didn't have</div>
                <div>depreciation.</div>
                <el-form-item label="Group of asset" prop="type" class="flex">
                  <el-input v-model="formChange.type" class="block ml-2" disabled />
                </el-form-item>
                <el-form-item label="Methode" prop="method" class="flex">
                  <el-input v-model="formChange.method" class="block ml-2" disabled />
                </el-form-item>
                <el-form-item label="Rates" prop="rate" class="flex">
                  <el-input v-model="formChange.rate" class="block ml-2" disabled />
                </el-form-item>
                <el-form-item label="Life" prop="year" class="flex">
                  <el-input v-model="formChange.year" class="block ml-2" disabled />
                </el-form-item>
              </div>
            </div>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSave">Save</el-button>
        </span>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MiniSearch from 'minisearch'
export default {
  data () {
    return {
      dialogVisible: false,
      radio: '1',
      checked: false,
      condition: [
        {
          value: 'New',
          label: 'New'
        },
        {
          value: 'Second',
          label: 'Second'
        }
      ],
      status: [
        {
          value: 'In Stock',
          label: 'In Stock'
        },
        {
          value: 'In Use',
          label: 'In Use'
        }
      ],
      /* form */
      form: {
        name: '',
        brandModel: '',
        categoryId: '',
        subcategoryId: '',
        condition: '',
        dapartmentId: '',
        sectionId: '',
        po: '',
        date: '',
        qty: '',
        currencyId: '',
        price: '',
        exchange: '',
        status: ''
      },
      formChange: {
        method: '',
        year: '',
        type: '',
        rate: ''
      },
      formEdit: {
        name: '',
        brandModel: '',
        categoryId: '',
        subcategoryId: '',
        condition: '',
        dapartmentId: '',
        sectionId: '',
        po: '',
        date: '',
        currencyId: '',
        price: '',
        exchange: '',
        status: ''
      },
      /* end of form */

      /* array  */
      categoryId: [''],
      subcategoryId: [''],
      dapartement: [''],
      currency: [''],
      section: [''],
      method: [''],
      rate: [''],
      year: [''],
      type: [''],
      /* end of array */

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
        brandModel: [
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
        condition: [
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
        section: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        po: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        date: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        qty: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        currency: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        exchange: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    ...mapGetters({
      selectDataCategory: ['category/getCategory'],
      selectDataSubCategory: ['subcategory/getSubCategory'],
      selectDataSection: ['section/getSections'],
      selectDataDapartment: ['dapartment/getDapartments'],
      selectDataCurrency: ['currency/getCurrency'],
      depreciationData: ['depreciation/getDepreciation'],
      pageTableData: ['assets/getAssets']
    })
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchCategory()
        await this.getSubCategory()
        await this.fetchDapartment()
        await this.fetchCurrency()
        await this.getSection()
        await this.fetchAssets()
        this.miniSearch.addAll(this.depreciationData)
        this.categoryId.push(...this.selectDataCategory.map(value => value.name))
        this.subcategoryId.push(...this.selectDataSubCategory.map(value => value.name))
        this.dapartement.push(...this.selectDataDapartment.map(value => value.name))
        this.section.push(...this.selectDataSection.map(value => value.name))
        this.currency.push(...this.selectDataCurrency.map(value => value.name))
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
    ...mapActions('category', ['fetchCategory']),
    ...mapActions('subcategory', ['fetchSubCategory', 'getSubCategory']),
    ...mapActions('dapartment', ['fetchDapartment']),
    ...mapActions('section', ['fetchSection', 'getSection']),
    ...mapActions('currency', ['fetchCurrency']),
    ...mapActions('depreciation', ['filterDepreciation']),
    ...mapActions('assets', ['inputAssets', 'fetchAssets', 'fetchDel', 'fetchEdit']),
    onSave () {
      try {
        this.inputAssets({
          name: this.form.name,
          brandModel: this.form.brandModel,
          categoryId: this.form.categoryId,
          subcategoryId: this.form.subcategoryId,
          condition: this.form.condition,
          dapartmentId: this.form.dapartmentId,
          sectionId: this.form.sectionId,
          po: this.form.po,
          date: this.form.date,
          qty: this.form.qty,
          currencyId: this.form.currencyId,
          price: this.form.price,
          exchange: this.form.exchange,
          method: this.formChange.method,
          type: this.formChange.type,
          rate: this.formChange.rate,
          year: this.formChange.year,
          status: this.form.status
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
    async handleCategoryChange (id) {
      await this.fetchSubCategory({ id })
    },
    async handleDapartementChange (id) {
      await this.fetchSection({ id })
    },
    async handleSubCategoryChange (id) {
      await this.filterDepreciation({ id })
      this.formChange = { ...this.depreciationData }
    },
    handleEdit (payload) {
      this.formEdit = { ...payload }
    }
  }
}
</script>
