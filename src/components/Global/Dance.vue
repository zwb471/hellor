<template>
	<div class='Dance'>
		<CloseCircleOutlined
			spin
			style="position: absolute;right: 15px;top: 15px;font-size: 30px;color: #fff;"
			@click="closeDance"
		/>
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useStore} from 'vuex'

import {cryptoDanceAudio} from '@/utils/cryptoDanceAudio'

export default {
	name: "Dance",
	setup(){
		const {commit,state} = useStore()
		const canvas = ref(null)
		const closeDance = ()=>{
			commit('setIsShowDance',false)
		}

		onMounted(()=>{

			setTimeout(()=>{
				cryptoDanceAudio(
					state.audioEle,
					state.audioContext,
					canvas.value,
					state.audioInfo.src
				)
			},1000)
		})

		return {
			canvas,
			closeDance,
		}
	}
}
</script>

<style scoped>
.Dance{
	position: fixed;
	left: 0;
	top: 0;
	z-index: 2999;

	width: 100vw;
	height: 100vh;


	background-image: -webkit-linear-gradient(
		135deg,
		rgb(142, 132, 133) 0%,
		rgb(230, 132, 110) 100%
	);
}
</style>