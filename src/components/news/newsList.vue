<template>
	<div class="news-container">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
				<router-link :to="'/home/newsInfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url" />
					<div class="mui-media-body title">
						<h5>{{item.title}}</h5>
						<p class="titleTime">
							<span>发表时间：{{item.add_time | dateFormat}}</span>
							<span>点击{{item.click}}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default{
	data(){
		return{
			// 新闻列表
			newslist:[]
		}
	},
	created(){
		this.getNewsList()
	},
	methods:{
		getNewsList(){//获取新闻列表
			this.$http.get('api/getnewslist').then(result => {
				if(result.body.status===0){
					this.newslist=result.body.message
				}else{
					Toast('新闻列表获取失败')
				}
			})
		}
	}
}
	
	
</script>

<style lang="scss" scoped="scoped">
	.news-container{
		h5{
			font-size: 16px;
			color: #000000;
		}
		.titleTime{
			span{
				font-size: 12px;
			}
			display: flex;
			justify-content: space-between;
			color: #0077DD;
		}
	}
</style>
