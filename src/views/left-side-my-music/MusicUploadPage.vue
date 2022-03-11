<template>
  <div class='MusicDownloadPage'>
    <label for="uploadAudio">
      <a-tag color="#55acee" style="padding: 10px 20px;cursor: pointer">
        <template #icon>
          <CloudUploadOutlined style="font-size: 18px;"/>
        </template>
        上传云盘
      </a-tag>
    </label>

    <template>
      <input id="uploadAudio" type="file" accept="audio/*" @change="handleFileUpload()" ref="fileInput"/>
    </template>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue"
import api from "@/common/baseProxy"
import {Modal} from "ant-design-vue"

export default {
  name: "MusicDownloadPage",
  setup(){
    const uploadState = reactive({
      fileInput: null,
      async handleFileUpload(){
        const fileList = this.fileInput.files
        if ( fileList.length ){
          const file =  fileList.item(0)

          const formData = new FormData()
          formData.append('songFile',file)
          // formData.append('name','dream')
          try {
            const res = await $axios({
              url: api + '/cloud?time='+ Date.now(),
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              data: formData
            })

            if ( res['data']['code'] ){
              Modal.success({
                title: '上传云盘成功'
              })
            }

          }catch (e) {
            console.log(e.message)
          }

        }

      }
    })

    return {
      ...toRefs(uploadState),
    }
  }
}
</script>

<style lang="less" scoped>
.MusicDownloadPage{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ant-tag{
  display: flex;
  align-items: center;
}
</style>