<template>
	<!-- 购物车模块 -->
	<div class="shopCar">
		<!-- 商品条目 -->
		<div class="mui-card" v-for="(item, i) in carList" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="product">
						<mt-switch v-model="$store.getters.getProductSelectd[item.id]" @change="selectChange(item.id, $store.getters.getProductSelectd[item.id])"></mt-switch>
						<img :src="item.thumb_path" />
						<div class="info">
							<p class="title">{{ item.title }}</p>
							<p>
								<span class="price">￥{{ item.sell_price }}</span>
								<numbox :initCount="$store.getters.getProductCount[item.id]" :carid="item.id"></numbox>
								<a href="#" @click.prevent="del(item.id, i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 结算 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div>
						<p>总价</p>
						<p>
							已勾选商品
							<span class="price">{{ $store.getters.getProductAllMoney.count }}</span>
							件， 总价:
							<span class="price">￥{{ $store.getters.getProductAllMoney.amount }}</span>
						</p>
					</div>
					<mt-button type="danger">结算</mt-button>
				</div>
			</div>
		</div>

		<div><mt-button type="danger" class="clearCar" @click="delCar">清空购物车</mt-button></div>
	</div>
</template>

<script>
import numbox from './shopNumbox.vue';
export default {
	data() {
		return {
			checked: true,
			carList: [],
			value: true
		};
	},
	created() {
		this.getShopCar();
	},
	methods: {
		getShopCar() {
			// 获取store中所有商品的id
			var idArr = [];
			this.$store.state.car.forEach(item => idArr.push(item.id));
			if (idArr.length <= 0) {
				// 如果购物车中没有商品，则不请求接口
				return;
			}
			this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
				if (result.body.status === 0) {
					this.carList = result.body.message;
				}
			});
		},
		del(id, i) {
			//删除商品。删除store中的和carList中的
			this.carList.splice(i, 1);
			this.$store.commit('del', id);
		},
		selectChange(id, val) {
			//当点击勾选框的时候将最新的状态传送给store
			this.$store.commit('changeSelectd', { id, selectd: val });
		},
		delCar() {
			//清空购物车
			this.$store.commit('delCar');
			// 重新加载购物车信息
			location.reload();
		}
	},
	components: {
		numbox
	}
};
</script>

<style scoped="scoped" lang="scss">
.shopCar {
	.product {
		img {
			width: 60px;
			height: 60px;
		}
		align-items: center;
	}
	.product {
		display: flex;
		.title {
			color: #000000;
			padding-left: 10px;
		}
	}
	.mui-card-content-inner {
		display: flex;
		justify-content: space-between;
	}
	.price {
		color: red;
		font-size: 14px;
	}
	// 清空购物车
	.clearCar {
		margin-left: 10px;
	}
}
</style>
