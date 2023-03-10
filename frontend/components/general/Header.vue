<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="w-full p-1" style="text-align: end;">
    <div class="mr-4 ">
      Log in as {{ ...user }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: []
    }
  },
  mounted () {
    const auth = this.$auth.user.username
    this.user.push(auth)
  }
}

</script>
