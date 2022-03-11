<template>
  <div class='CommentPage'>
    <CommentIndex v-model:commentData="commentData" :id="id"/>
  </div>
</template>

<script>
import {reactive, toRefs, watchEffect} from "vue"
import {getPlaylistComment} from "@/common/commentApi"
import CommentIndex from "@/components/Global/Comment/CommentIndex"

export default {
  name: "CommentPage",
  components: {CommentIndex},
  props: ['id'],
  setup(props){
//	  console.log(typeof props.id,props.id)
    const commentState = reactive({
      commentData: {},
      limit: 30,
      offset: 0,
      dataTime: 0,
      async getCommentData(id){
        const res = await getPlaylistComment(id,this.limit,this.offset)
        const result = res['data']
        // console.log(result)
        if ( result.comments.length > 0 ){
          this.commentData = result
        }
      }
    })

    watchEffect(()=>{
      commentState.getCommentData(props.id)
    })

    return {
      ...toRefs(commentState)
    }
  }
}
</script>

<style scoped>

</style>