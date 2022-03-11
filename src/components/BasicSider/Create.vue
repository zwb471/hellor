<template>
  <div class='Create'>
    <div class="input-item">
      <a-input
        placeholder="请输入新歌单名称"
        :value="songSheetName"
        @change="onNameChange"
      />
    </div>
    <div class="input-item">
      <a-checkbox @change="onPrivacyChange" v-model:checked="songSheetPrivacy">设置为隐私歌单</a-checkbox>
    </div>

  </div>
</template>

<script setup>
defineProps({
  songSheetName: String,
  songSheetPrivacy: Boolean
})
const emit = defineEmits()

const onNameChange = (e)=>{
  emit('update:songSheetName',e.target.value)
}
const onPrivacyChange = (e) => {
  emit('songSheetPrivacy',e.target.value)
}
</script>

<style scoped>
.input-item {
  margin-bottom: 8px;
  font-size: 12px;
}
</style>