<template>
  <div class='MenuIcon'>
    <h1>MenuIcon </h1>
  </div>
</template>

<script>
export default {
  name: "MenuIcon",
  inheritAttrs: false,
  setup(props,{attrs}){
    return ()=>attrs.icon()
  }
}
</script>

<style scoped>

</style>