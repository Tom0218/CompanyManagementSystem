<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
  components:{
    RouterView,
  },
}
</script>

<template>
  <div class="body">
    <RouterView />
  </div>

</template>

<style lang="scss" scoped>
.body{
  height: auto;
  width: 100vw;
  background-color: rgb(9, 38, 53);
}
</style>
