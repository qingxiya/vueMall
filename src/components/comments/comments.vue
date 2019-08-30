<template>
	<div class="comment-container">
		<h4>评论</h4>
		<hr>
		<textarea placeholder="请输入评论内容(最多120字)" maxlength="120" rows="5" v-model="commentContent"></textarea>
		<mt-button type="primary" size="large" @click="addComment">发表</mt-button>
		<!-- 评论内容 -->
		<div class="comment" v-for="(item,i) in commentList" :key="item.add_time">
			<p class="comment-title">
				第{{i+1}}楼 用户 {{item.user_name }} 发表时间 {{item.add_time | dateFormat}}
			</p>
			<p class="comment-content">
				{{item.content==='undefined'?'该用户很懒，什么都没说':item.content}}
			</p>
		</div>
		<mt-button type="default" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
export default{
	data(){
		return{
			// pageindex：一页等于10条数据
			pageindex:1,
			// 所有评论数据
			commentList:[],
			// 用户添加评论
			commentContent:''
		}
	},
	created(){
		this.getComments()
	},
	methods:{
		getComments(){
			this.$http.get('api/getcomments/'+this.id+"?pageindex="+this.pageindex).then(result =>{
				if(result.body.status===0){
					// 在获取数据的时候，不覆盖以前的数据，在以前的数据上追加数据
					this.commentList=this.commentList.concat(result.body.message)
				}else{
					Toast('加载评论失败')
				}
			})
		},
		getMore(){//加载更多
			this.pageindex++;
			this.getComments()
		},
		addComment(){//添加评论
			// 判断用户是否输入
			if(this.commentContent.trim()==='' || this.commentContent.trim()==null){
				return Toast('请输入评论内容')
			}
		
			this.$http.post('api/postcomment/'+this.$route.params.id,{ content:this.commentContent }).then(result =>{
				
				if(result.body.status === 0){
					// 手动拼接出一个评论对象，实现评论刷新
					var comment={
						user_name:'匿名用户',
						add_time:Date.now(),
						content:this.commentContent
					}
					// 将评论数据放到最上面
					this.commentList.unshift(comment)
					// 清空输入框
					this.commentContent=''
				}else{
					Toast('评论失败')
				}
				
			})
			
		}
	},
	
	props:["id"]
	
}
</script>

<style scoped="scoped" lang="scss">
	.comment-container{
		.comment-title{
			background: #CCCCCC;
			font-size: 12px;
			margin: 5px 0;
		}
		.comment-content{
			text-indent: 2em;
		}
	}
</style>
