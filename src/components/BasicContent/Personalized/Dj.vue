<template>
  <div class='Dj'>
    <ul class="list">
      <DjItem
        class="list-item"
        v-for="item in djList.slice(0,6)"
        :dj="item"
        :key="item['id']"
      />
    </ul>
  </div>
</template>

<script>
import DjItem from "@/components/BasicContent/Personalized/DjItem"
import {reactive, toRefs} from "vue"
import api from "@/common/baseProxy"
export default {
  name: "Dj",
  components: {DjItem},
  setup(){
    const djState = reactive({
      djList: [],
      async getDjList(){
        try {
          const res= await $axios.get(api+'/dj/hot')
          this.djList = res['data']['djRadios']
        }catch (e) {
          console.log(e.message)
        }
      }
    })
    djState.getDjList()

    return {
      ...toRefs(djState)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-between;
  .list-item {
    width: 15%;
  }
}
</style>