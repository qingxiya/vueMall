<template>
	<div class="imagesContainer">
		<!-- 导航栏 -->
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<!-- 动态选中文字高亮 -->
					<a
						:class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
						href="#item1mobile"
						data-wid="tab-top-subpage-1.html"
						v-for="item in cates"
						:key="item.id"
						@click="getImagesInfo(item.id)"
					>
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

		<!-- 图文内容 懒加载-->
		<div class="images-lazy">
			<ul>
				<router-link tag="li" :to="'/home/images/imagesInfo/'+item.id" v-for="item in list" :key="item.id">
					<img v-lazy="item.img_url" />
					<div class="images-text">
						<p>{{ item.title }}</p>
						<p>{{ item.zhaiyao }}</p>
					</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
// 导入mui.js
import mui from '../../lib/mui/js/mui.min.js';
export default {
	data() {
		return {
			// 图文分类的全部
			cates: [],
			// 图片详情空数组
			list: []
		};
	},
	created() {
		this.getImagesList();
		// 请求图片详情，Id默认为0，代表请求全部数据
		this.getImagesInfo(0);
	},
	mounted() {
		//在VUE实例化前将导航条加载好
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
	methods: {
		getImagesList() {
			//获取图文分类
			this.$http.get('api/getimgcategory').then(result => {
				if (result.body.status === 0) {
					result.body.message.unshift({ title: '全部', id: 0 });
					this.cates = result.body.message;
				}
			});
		},
		getImagesInfo(cateId) {
			//获取图文详细信息
			this.$http.get('api/getimages/' + cateId).then(result => {
				if (result.body.status === 0) {
					this.list = result.body.message;
				}
			});
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
//懒加载，未实现
img[lazy='loading'] {
	width: 40px;
	height: 300px;
	margin: auto;
}
// 解除chrome对导航条滑动效果的错误提示
.mui-segmented-control-inverted {
	touch-action: none;
}

.imagesContainer {
	.images-lazy {
		ul {
			padding: 0px 20px;
		}
		li {
			list-style: none;
			text-align: center;
			padding: 10px;
			position: relative;
		}
		img {
			width: 100%;
			vertical-align: middle;
			box-shadow: 0 0 6px hotpink;
		}
		// 文字
		.images-text {
			z-index: 1;
			position: absolute;
			bottom: 0;
			background: #cccccc;
			margin-right: 10px;
			background-color: rgba(0, 0, 0, 0.5);
			margin-bottom: 10px;
			p {
				color: white;
				padding-right: 5px;
				overflow: hidden;
				text-overflow: ellipsis;
				max-height: 80px;
				z-index: 2;
			}
		}
	}
}
</style>
