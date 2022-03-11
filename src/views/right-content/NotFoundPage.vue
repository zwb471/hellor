<template>
  <div class='NotFoundPage'>
    <h1> 您访问的页面不存在 </h1>
    <Loading />
  </div>
</template>

<script>
import Loading from "@/components/Global/Loading"
export default {
  name: "NotFoundPage",
  components: {Loading},
}
</script>

<style lang="less" scoped>
.NotFoundPage{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>