<template>
	<!-- 音乐播放 -->
	<div class="musicPlay">
		<img :src="playinfo.pic_big" />
		<p>{{playinfo.title}}</p>
		<p>演唱：{{playinfo.author}}</p>
		<p>所属专辑：{{playinfo.album_title}}</p>
		<p>出品方：{{playinfo.si_proxycompany}}</p>
		<audio :src="playlist.show_link" controls="controls" class="play"></audio>
	</div>
</template>

<script>
export default{
	data(){
		return{
			song_id:this.$route.params.id, //歌曲id
			playlist:[], //歌曲播放信息
			playinfo:[] //歌曲信息
		}
	},
	created(){
		this.getPlay()
	},
	methods:{
		getPlay(){ //按照歌曲Id请求歌曲信息
			this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='+this.song_id).then(res=>{
				if(res.status===200){
						this.playlist=res.body.bitrate
						this.playinfo=res.body.songinfo
						console.log(res.body)
				}
			})
		}
	}
}
</script>

<style scoped="scoped">
	.musicPlay{
		text-align: center;
		margin-top: 30px;
	}
	.play{
		height: 28px;
		margin-top: 25px;
	}
	
</style>
