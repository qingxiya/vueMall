<template>
	<div class="productList">
		<!-- 遍历数据 -->
		<div @click="goProductInfo(item.id)" class="product-list" v-for="item in list" :key="item.id">
			<img :src="item.img_url" />
			<span class="title">{{item.title}}</span>
			<div class="productList-text">
				<p class="price">
					<span class="now">￥{{item.sell_price}}</span>
					<s class="before">￥{{item.market_price}}</s>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>
		<mt-button class="btn" type="primary" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
export default{
	data(){
		return{
			list:[],
			// 默认加载第一页，一页为10条数据
			pageindex:1
		}
	},
	created(){
		this.getProductList()
	},
	methods:{
		getProductList(){
			this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result =>{
				if(result.body.status === 0){
					// 不清空之前的商品，追加商品
					this.list=this.list.concat(result.body.message)
				}
			})
		},
		getMore(){//加载更多
			this.pageindex++,
			this.getProductList()
		},
		goProductInfo(id){//编程式导航跳转，去到商品详情 传ID过去
			this.$router.push({ name: 'productInfo', params: { id: id }})
		}
	}
}
</script>

<style scoped="scoped" lang="scss">
.productList {
	.btn{
		margin-top: 20px;
	}
	// 单个商品
	.product-list {
		img {
			width: 100%;
			min-height: 174px;
		}
		.title{
			  width: 100%;
			  height: 42px;
			  word-break: break-all;
			  display: -webkit-box;
			  -webkit-line-clamp: 2; /** 显示的行数 **/
			  overflow: hidden;  /** 隐藏超出的内容 **/
			  text-overflow: clip;
		}
		// 商品文字介绍
		.productList-text {
			.price {
				.now {
					font-size: 16px;
					color: red;
				}
				.before {
					margin-left: 30px;
				}
				line-height: 30px;
			}
			.sell {
				display: flex;
				justify-content: space-between;
				font-size: 13px;
			}
			p {
				margin: 0;
			}
			background: #eeeeee;
		}
		width: 49%;
		margin-top: 10px;
		box-shadow: 0 0 8px #dddddd;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	justify-content: space-between;
}
</style>
