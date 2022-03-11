<template>
  <div class='CommentIndex' >
	  <a onclick="document.getElementById('reply').scrollIntoView()">去评论</a>
<!--	  热门评论    -->
	  <div v-if="commentData && commentData['hotComments'] ?.length">
		  <a-list
			  class="comment-list"
			  :header="`${commentData && commentData['hotComments'] ?.length} 条热门评论`"
			  item-layout="horizontal"
			  :data-source="commentData['hotComments']"
		  >
			  <template #renderItem="{ item }">
				  <a-list-item>
					  <a-comment :author="item.author" :avatar="item.avatar">
						  <template #actions>
						  <span key="comment-basic-like">
				        <a-tooltip title="点赞">
				          <template v-if="action === 'liked'">
				            <LikeFilled  />
				          </template>
				          <template v-else>
				            <LikeOutlined  />
				          </template>
				        </a-tooltip>
				        <span style="padding-left: 8px; cursor: auto">
				          ({{ item['likedCount'] }})
				        </span>
				      </span>
						  </template>

						  <template #datetime>
							  <a>{{moment(item.time).format('YYYY年MM月DD日 HH:mm:ss')}} </a>
							  &nbsp;
							  &nbsp;
							  {{item['timeStr']}}
						  </template>
						  <template #author>
							  <a>{{item.user.nickname}}</a>
						  </template>
						  <template #avatar>
							  <a-avatar
								  :src="item.user.avatarUrl+'?param=32y32'"
								  :alt="item.user.nickname"
							  />
						  </template>
						  <template #content>
							  <p>
								  {{item.content}}
							  </p>
						  </template>

					  </a-comment>
				  </a-list-item>
			  </template>
		  </a-list>
	  </div>
<!--	  热门评论-->

    <!--评论及发表评论-->
    <!--发表评论-->
	  <div id="reply">最新评论</div>
    <a-comment>
      <template #avatar>
        <a-spin spin :spinning="!userInfo.avatarUrl">
          <a-avatar
            :src="userInfo.avatarUrl"
            alt="Han Solo"
          />
        </a-spin>
      </template>
      <template #content>
        <a-form-item>
          <a-textarea :rows="4" v-model:value="value" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit()">
            发表评论
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
    <!--发表评论-->


    <a-list
      class="comment-list"
      :data-source="commentData.comments"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment>
            <template #datetime>
              <a>{{moment(item.time).format('YYYY年MM月DD日 HH:mm:ss')}} </a>
              &nbsp;
              &nbsp;
              {{item['timeStr']}}
            </template>
            <template #author>
              <a>{{item.user.nickname}}</a>
            </template>
            <template #avatar>
              <a-avatar
                :src="item.user.avatarUrl+'?param=32y32'"
                :alt="item.user.nickname"
              />
            </template>
            <template #content>
              <p>
                {{item.content}}
              </p>
            </template>

            <template #actions>
	            <span key="comment-basic-like">
				        <a-tooltip title="点赞">
				          <template v-if="action === 'liked'">
				            <LikeFilled  />
				          </template>
				          <template v-else>
				            <LikeOutlined  />
				          </template>
				        </a-tooltip>
				        <span style="padding-left: 8px; cursor: auto">
				          {{ item['likedCount'] }}
				        </span>
				      </span>

              <span @click="replyOthers(item['commentId'])">回复</span>
            </template>


            <template v-for="(sub,index) in item['beReplied']" :key="index">
              <a-comment
                :author="sub.user.nickname"
                :avatar="sub.user.avatarUrl"
                :content="sub.content"
                :datetime="moment(item.time).format('YYYY年MM月DD日 HH:mm:ss') + '-' + item['timeStr']"
              />
            </template>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>
    <!--评论及发表评论-->

  </div>
</template>

<script>
import {markRaw, reactive, ref, toRefs, watchEffect} from "vue"
import moment from "moment"
import {replyComment, sendComment} from "@/common/commentApi"
import {useStore} from "vuex"
import {Modal} from 'ant-design-vue'

export default {
  name: "CommentIndex",
  // props: ['commentData','datetime','id'],
	props: {
		commentData: {
			type: Object,
			default: ()=>({
				comments: [],
				hotComments: [],
				topComments: [],
			})
		},
		id: String
	},
  setup(props,{emit}){

    const {state,} = useStore()

    const commentState = reactive({
      // comments: [],
      submitting: false,
      value: '',
      handleSubmit(t=1,type=2,id=props['id'],value=commentState.value) {
        if (!this.value)return

        this.submitting = true;
        setTimeout(async () => {
          this.submitting = false;

          const res = await sendComment(t,type,id,value)

          if ( res['status'] === 200 && res['data']['code'] === 200 ){
            // emit('update:datetime',Date.now())
            emit('update:commentData',{
							...props.commentData,
              comments: [
                res['data']['comment'],
                ...props.commentData.comments,
              ],

              // 测试
              // comments: [
              //   {
              //     user: {
              //       avatarUrl: 'https://p2.music.126.net/ZaPDp86Fdc_hjuU588avkA==/2885118511986598.jpg?param=140y140',
              //       nickname: '追梦人'
              //     },
              //     content: this.value,
              //     time: Date.now(),
              //   },
              //   ...props.commentData.comments,
              // ]
            })
          }

          this.value = '';
        }, 1000);
      },

     async replyOthers(cid){
				if ( commentState.value !== '' ){
					// console.log(props.id,commentState.value,cid)
					const res = await replyComment(2,2,props.id,commentState.value,cid)
					// console.log(res)
					if ( res['status'] === 200 && res['data']['code'] === 200 ) {
						// emit('update:datetime',Date.now())
						emit('update:commentData', {
							...props.commentData,
							comments: [
								res['data']['comment'],
								...props.commentData.comments,
							],
						})
					}
					commentState.value = ''
				}else {
					Modal.error({
						title: '请先输入回复内容'
					})
				}
      }
    })

    watchEffect(()=>{
      //console.log(props.commentData)
    })

	  const likes = ref(0)
	  const action = ref()
	  const like = () => {
		  likes.value = 1
		  action.value = 'liked'
	  };


	  return {
      ...toRefs(commentState),
      moment,
      ...toRefs(state),

		  likes,
		  action,
		  like
    }
  }
}
</script>

<style lang="less" scoped>

</style>