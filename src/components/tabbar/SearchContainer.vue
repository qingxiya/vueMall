<template>
	<div>
		
	<div class="search"> 
	    <div class="col-sm-10">
	      <input type="text" ref="info" class="form-control search-input" placeholder="歌曲、歌手、专辑">
	    </div>
		<button class="btn btn-primary search-btn" @click="onSearch">搜索</button>
	</div>
	<router-link tag="div" :to="'/home/musicPlay/'+item.songid" v-for="item in info" :key="item.songid" >
		<van-cell :title="item.songname" :value="item.artistname" is-link  />
	</router-link>
	
	</div>
</template>

<script>
export default{
	data(){
		return{
			info:''
		}
	},
	methods:{
		onSearch(){ //搜索
			this.info=this.$refs.info.value
			this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query='+this.info).then(res=>{
				this.info=res.body.song
			})
		}
	}
}
</script>

<style scoped="scoped" lang="scss">
	.search{
		display: flex;
		justify-content: space-between;
		.search-input{
			width: 100%;
		}
		.search-btn{
			height: 95%;
			width: 15%;
			margin-top: 5px;
		}
		margin: 10px 5px;
	}
</style>
