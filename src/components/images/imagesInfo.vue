<template>
	<div class="imagesInfo">
		<!-- 标题-头 -->
		<h4>里哪里能够我里哪里能够我里哪里能够我</h4>
		<p class="imagesInfo-title">
			<span>发表时间{{ imageList.add_time | dateFormat }}</span>
			<span>点击{{ imageList.click }}次</span>
		</p>
		<hr />
		<!-- 图片详情 （缩略图）-->
		<div class="imageSrc">
			<!--  <img :src="item.src" v-for="(item,index) in imageSrcList" :key="item.src"
			   class="preview-img" height="100" @click="$preview.open(index,imageSrcList)"
			  > -->
			<template>
				<vue-preview :slides="imageSrcList" @close="handleClose"></vue-preview>
			</template>
		</div>

		<div v-html="imageList.content" class="imagesInfo-text"></div>

		<!-- 评论 -->
		<CommentsBox :id="this.id"></CommentsBox>
	</div>
</template>

<script>
import Comments from '../comments/comments.vue';
export default {
	data() {
		return {
			id: this.$route.params.id,
			// 图文详情
			imageList: [],
			// 图片源
			imageSrcList: []
		};
	},
	created() {
		this.getImagesInfo();
		this.getImagesSrc();
	},
	methods: {
		getImagesInfo() {
			//获取图文详情
			this.$http.get('api/getimageInfo/' + this.id).then(result => {
				if (result.body.status === 0) {
					this.imageList = result.body.message[0];
				}
			});
		},
		getImagesSrc() {
			//获得图片
			this.$http.get('api/getthumimages/' + this.id).then(result => {
				if (result.body.status === 0) {
					// 循环每张图片，补全图片的宽高和缩略图源
					result.body.message.forEach((item, i) => {
						item.w = 600;
						item.h = 400;
						item.msrc = result.body.message[i].src;
					});
					// 替换
					this.imageSrcList = result.body.message;
				}
			});
		},
		handleClose() {//给插件调用的
			console.log('close event');
		}
	},
	components: {//评论组件
		CommentsBox: Comments
	}
};
</script>

<style lang="scss" scoped="scoped">
.imagesInfo {
	padding: 4px;
	h4 {
		text-align: center;
	}
	.imagesInfo-title {
		display: flex;
		justify-content: space-between;
	}
	.imagesInfo-text {
		font-size: 13px;
		line-height: 30px;
	}
	// 缩略图
	.imageSrc {
		/deep/ .my-gallery {
			display: flex;
			flex-wrap: wrap;
			figure {
				width: 30%;
				margin: 5px;
				img {
					width: 100%;
				}
			}
		}
	}
}
</style>
