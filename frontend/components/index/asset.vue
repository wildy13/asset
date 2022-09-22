<template>
  <el-container>
    <div>
      <div class="flex justify-between  mt-2 ml-2">
        <!-- Add Button -->
        <el-button type="primary" icon="el-icon-circle-plus-outline">
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
    </div>
  </el-container>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  computed: {

  },
  created () {
    if (process.browserr) {
      try {

      } catch (error) {

      }
    }
  },

  methods: {

  }
}
</script>
