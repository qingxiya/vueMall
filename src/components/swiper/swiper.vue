<template>
	<mt-swipe :auto="4000">
		<mt-swipe-item v-for="item in lunbolist" :key="item.id">
			<img :src="item.img" :class="{full:isfull}"/>
		</mt-swipe-item>
	</mt-swipe>
</template>

<script>
export default {
	//<!-- 第一个参数是图片数据列表，第二个是否然图片宽度和高度100% -->
	props:["lunbolist","isfull"]
};
</script>

<style scoped="scoped" lang="scss">
	.mint-swipe-item {
		// isfull为false时img height: 100%;width自适应（也就是不设置）
		img{
			height: 100%;
		}
		//图片是否宽高为100%
		.full {
			width: 100%;
			height: 100%;
		}
	}
</style>
