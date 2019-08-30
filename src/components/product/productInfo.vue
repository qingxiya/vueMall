<template>
	<div>
		<!-- 购物车小球 -->
		<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"><div class="ball" v-show="flag" ref="ball"></div></transition>

		<!-- 商品轮播图 -->
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<!-- 第一个参数是图片数据列表，第二个是否让图片宽度和高度100% -->
				<Swiper :lunbolist="lunbolist" :isfull="false"></Swiper>
			</div>
		</div>

		<!-- 立即购买，加入购物车 -->
		<div class="mui-card-header">{{ productInfo.title }}</div>
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<p>
					市场价：
					<del>￥{{ productInfo.market_price }}</del>
					&nbsp;&nbsp; 销售价：
					<span class="nowPrice">￥{{ productInfo.sell_price }}</span>
				</p>
				<p>
					购买数量：
					<!-- 拿到子组件数字改变的值，和传递商品剩余量 -->
					<Numbox @getcount="getSelectdCount" :max="productInfo.stock_quantity"></Numbox>
				</p>
				<span>
					<mt-button type="primary">立即购买</mt-button>
					<mt-button type="danger" @click="addCar">加入购物车</mt-button>
				</span>
			</div>
		</div>

		<!-- 商品参数 -->
		<div class="mui-card-header">商品参数</div>
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<p>商品货号：{{ productInfo.goods_no }}</p>
				<p>库存情况：{{ productInfo.stock_quantity }}</p>
				<p>上架时间：{{ productInfo.add_time | dateFormat }}</p>
			</div>
		</div>
		<div class="mui-card-footer">
			<!-- 商品评论，图文详情 -->
			<mt-button type="primary" size="large" plain @click="goImageText(id)">图文介绍</mt-button>
			<br />
			<mt-button type="danger" size="large" plain @click="goProductComment(id)">商品评论</mt-button>
		</div>
	</div>
</template>

<script>
// 导入轮播图
import Swiper from '../swiper/swiper.vue';
// 数字输入框
import Numbox from './numbox.vue';
//
export default {
	data() {
		return {
			id: this.$route.params.id,
			//缩略图
			lunbolist: [],
			//品参数区和价格，标题等数据
			productInfo: [],
			// 加入购物车
			flag: false,
			// 保存用户选中的商品数量，默认为1
			SelectdCount: 1
		};
	},
	created() {
		this.getProductInfo();
		this.getinfo();
	},
	methods: {
		getProductInfo() {
			//获取商品缩略图
			this.$http.get('api/getthumimages/' + this.id).then(result => {
				if (result.body.status === 0) {
					// 由于图片是放在swiper组件中，swiper遍历图片的是img属性，我们得到的是src，所以我们手动加一个img属性，值和src的一样
					result.body.message.forEach(item => {
						item.img = item.src;
					});
					this.lunbolist = result.body.message;
				}
			});
		},
		getinfo() {
			//获取商品参数区和价格，标题等数据
			this.$http.get('api/goods/getinfo/' + this.id).then(result => {
				if (result.body.status === 0) {
					this.productInfo = result.body.message[0];
				}
			});
		},
		goImageText(id) {
			//商品图文
			this.$router.push({ name: 'imageText', params: { id: id } });
		},
		goProductComment(id) {
			this.$router.push({ name: 'productComment', params: { id: id } });
		},
		addCar() {
			//加入购物车
			this.flag = !this.flag;

			// 设计一个商品的对象（id,价格，数量，是否选中）保存到store
			var productInfo = {
				id: this.id,
				count: this.SelectdCount,
				price: this.productInfo.sell_price,
				selectd: true
			};
			// 调用mutation将商品加入购物车
			this.$store.commit('addToCar', productInfo);
		},
		// 小球半场动画
		beforeEnter(el) {
			el.style.transform = 'translate(0,0)';
		},
		enter(el, done) {
			el.offsetWidth;

			// 获取小球在页面中的位置
			const ballPosition = this.$refs.ball.getBoundingClientRect();
			// 获取徽标的位置，由于是不同组件，所以我们用DOM方式获取
			const badgePosition = document.getElementById('badge').getBoundingClientRect();
			// 坐标差
			const X = badgePosition.left - ballPosition.left;
			const Y = badgePosition.top - ballPosition.top;

			el.style.transform = `translate(${X}px,${Y}px)`;
			el.style.transition = 'all 0.4s cubic-bezier(.4,-0.3,1,.68)';
			done();
		},
		afterEnter(el) {
			this.flag = !this.flag;
		},
		getSelectdCount(count) {
			//获得用户选中商品数量
			this.SelectdCount = count;
		}
	},
	components: {
		Swiper,
		Numbox
	}
};
</script>

<style scoped="scoped" lang="scss">
// 轮播图样式
.mint-swipe {
	height: 200px;
	text-align: center;
}
.mint-swipe-item {
	img {
		height: 100px;
	}
}
// 商品参数区和价格
.nowPrice {
	color: red;
	font-size: 18px;
}

// 底部按钮
.mui-card-footer {
	display: block;
}

// 小球
.ball {
	width: 15px;
	height: 15px;
	background: red;
	position: absolute;
	border-radius: 50%;
	margin-top: 330px;
	z-index: 99;
	margin-left: 139px;
}
</style>
