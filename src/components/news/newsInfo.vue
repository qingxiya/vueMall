<template>
	<div class="newsinfo-container">
		<!-- 标题-头 -->
		<h4>
			{{newsInfoList.title}}
		</h4>
		<p class="newsinfo-title">
			<span>{{newsInfoList.add_time | dateFormat}}</span>
			<span>点击{{newsInfoList.click}}次数</span>
		</p>
		<hr>
		<!-- 内容 -->
		<div v-html="newsInfoList.content">
			
		</div>
		<!-- 评论 传递id给子组件-->
		<CommentsBox :id="this.id"></CommentsBox>
	</div>
</template>

<script>
// 导入评论子组件
// 评论
import Comments from '../comments/comments.vue'
import { Toast } from 'mint-ui';	
export default{
	data(){
		return{
			id:this.$route.params.id,
			newsInfoList:{}
		}
	},
	created(){
		this.getnewsInfo()
	},
	methods:{
		getnewsInfo(){//获取新闻详细信息
			this.$http.get('api/getnew/'+this.id).then(result =>{
				// 替换空数据
				if(result.body.status===0){
					this.newsInfoList=result.body.message[0]
				}else{
					Toast('加载新闻失败')
				}
			})
		}
	},
	// 评论子组件
	components:{
		'CommentsBox':Comments
	}
}
</script>

<style lang="scss" scoped="scoped">
	.newsinfo-container{
		h4{
			text-align: center;
		}
		.newsinfo-title{
			// 文字两端对齐
			display: flex;
			justify-content: space-between;
		}
		padding: 0 5px;
	}
</style>
