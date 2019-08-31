<template>
	<!-- 歌曲榜单分类 -->
	<div>
		<van-cell title="热门榜单" />
		<van-cell title="新歌榜" is-link @click="gomusic(1)" />
		<van-cell title="热歌榜" is-link @click="gomusic(2)"/>
		<van-cell title="摇滚榜" is-link @click="gomusic(11)"/>
		<van-cell title="流行榜" is-link @click="gomusic(16)"/>
		<van-cell title="爵士榜" is-link @click="gomusic(12)"/>
		<van-cell title="网络歌曲榜" is-link @click="gomusic(25)"/>
		<van-cell title="欧美金曲榜" is-link @click="gomusic(21)"/>
		<van-cell title="经典老歌榜" is-link @click="gomusic(22)"/>
		<van-cell title="情歌对唱榜" is-link @click="gomusic(23)"/>
		<van-cell title="影视金曲榜" is-link @click="gomusic(24)"/>
	</div>
	
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	methods:{
		gomusic(id){ //新歌榜
			this.$router.push({ name: 'music', params: { id: id }})
		}
	}
}	

	
</script>

<style>
</style>
