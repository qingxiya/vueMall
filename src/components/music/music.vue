<template>
	<!-- 音乐列表 -->
	<div class="music">
		<router-link tag="p" :to="'/home/musicPlay/'+item.song_id" class="info" v-for="item in list" :key="item.id">
			<img :src="item.pic_big"/>
			<br>
			<p class="text">
				<span>{{item.title}}</span>
			</p>
		</router-link>
		
		<mt-button type="default" size="large" @click="more">加载更多</mt-button>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				playlist:[],
				offset:0
			}
		},
		created(){
			this.getMusicList()
		},
		methods:{
			getMusicList(){ //请求热门歌曲数据
				this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=2&size=10&offset='+this.offset).then(result=>{
					this.list=this.list.concat(result.body.song_list)
				})
			},
			more(){ //加载更多
				this.offset += 10
				this.getMusicList()
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.music{
		
	}
	.info{
		text-align: center;
		width: 50%;
		float: left;
	}
	.text{
		// width: 18em;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		// width:50px;
	}
</style>
