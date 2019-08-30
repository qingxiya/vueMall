<template>
	<div>
		<!-- 轮播图 -->
		<!-- 第一个参数是图片数据列表，第二个是否然图片宽度和高度100% -->
		<Swiper :lunbolist="lunbolist" :isfull="true"></Swiper>
		<!-- 六宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/newsList">
					<img src="../../images/menu1.png" />
					<div class="mui-media-body">新闻资讯</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/images">
					<img src="../../images/menu2.png" />
					<div class="mui-media-body">图片分享</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/productList">
					<img src="../../images/menu3.png" />
					<div class="mui-media-body">商品购买</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<img src="../../images/menu4.png" />
					<div class="mui-media-body">留言反馈</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<img src="../../images/menu5.png" />
					<div class="mui-media-body">视频专区</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<img src="../../images/menu6.png" />
					<div class="mui-media-body">联系我们</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
//提示框
import { Toast } from 'mint-ui';
// 轮播图
import Swiper from '../swiper/swiper.vue'
export default {
	data() {
		return {
			// 轮播图数据列表，默认为空
			lunbolist: []
		};
	},
	created() {
		this.lunbo();
	},
	methods: {
		// 获取轮播图
		lunbo() {
			this.$http.get('api/getlunbo').then(result => {
				if(result.body.status===0){
					// 替换空的数据
					this.lunbolist = result.body.message;
				}else{
					Toast('轮播图载入失败');
				}
			});
		}
	},
	components:{
		Swiper
	}
};
</script>

<style scoped="scoped" lang="scss">
// 轮播图样式
.mint-swipe {
	height: 200px;
}
// 六宫格
.mui-grid-view {
	background: #ffffff;
}
.mui-table-view-cell {
	img {
		width: 60%;
	}
}
.mui-grid-view .mui-table-view-cell {
	border: none;
}
</style>
