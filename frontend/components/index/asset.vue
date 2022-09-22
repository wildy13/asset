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
          class="ml-250  w-1"
          placeholder="search data Data in Here"
        />
      </div>
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
                  <el-select v-model="form.subcategoryId" class="block ml-2">
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
                <el-form-item label="Dapartment" prop="dapartment" class="flex">
                  <el-select v-model="form.dapartement" class="block ml-2" @change="handleDapartementChange">
                    <el-option
                      v-for="item in selectDataDapartment"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Section" prop="section" class="flex">
                  <el-select v-model="form.section" class="block ml-2">
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
                <el-form-item label="Section" prop="currency" class="flex">
                  <el-select v-model="form.currency" class="block ml-2 w-5">
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
      form: {
        name: '',
        brandModel: '',
        categoryId: '',
        subcategoryId: '',
        condition: '',
        dapartement: '',
        section: '',
        po: '',
        date: '',
        qty: '',
        currency: '',
        price: '',
        exchange: ''
      },
      categoryId: [''],
      subcategoryId: [''],
      dapartement: [''],
      currency: [''],
      section: [''],
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
      selectDataCurrency: ['currency/getCurrency']
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
    onSave () {
      try {
        this.inputAsset({
          name: this.form.name,
          brandModel: this.form.brandModel,
          categoryId: this.form.categoryId,
          subcategoryId: this.form.subcategoryId,
          condition: this.form.condition,
          dapartement: this.form.dapartement,
          section: this.form.section,
          po: this.form.po,
          date: this.form.date,
          qty: this.form.qty,
          currency: this.form.currency,
          price: this.form.price,
          exchange: this.form.exchange
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
    }
  }
}
</script>
