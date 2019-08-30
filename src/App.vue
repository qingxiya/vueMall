<template>
	<div class="container-div">
		<!-- 顶部header -->
		<mt-header fixed title="子元素商城">
			  <a @click="$router.go(-1)" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </a>
		</mt-header>
		
		<!-- 中间main -->
		<transition><router-view></router-view></transition>
		<!-- 底部tabbar -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-l" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-l" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-l" to="/shoppingCart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-l" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
export default {
	methods:{
		isReturn(){
			this.$router.go=-1
		}
	}
}
</script>

<style lang="scss" scoped>
.container-div {
	padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;

	// 给我们的header设置为最高权重
	.mint-header {
		z-index: 99;
	}
	.isResult{
		z-index: 100;
	}

	// 重新设置tabbar样式
	.mui-bar-tab .mui-tab-item-l {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
		box-shadow: 0 0 black;
	}
	.mui-bar-tab .mui-tab-item-l .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-l .mui-icon ~ .mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}

// tabbar切换动态效果
.v-enter {
	opacity: 0;
	// 动画从右边进来
	transform: translateX(100%);
}
.v-leave-to {
	// 左边消失
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active {
	opacity: 1;
	transition: all 0.4s ease;
}
</style>
