<template>
	<div class="imgText">
		<h1>{{ list.title }}</h1>
		<hr />
		<!-- 图文内容 -->
		<div class="content" v-html="list.content"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			id: this.$route.params.id,
			list: []
		};
	},
	created() {
		this.getImageText();
	},
	methods: {
		getImageText() { //获取图文数据
			this.$http.get('api/goods/getdesc/' + this.id).then(result => {
				if (result.body.status === 0) {
					this.list = result.body.message[0];
				}
			});
		}
	}
};
</script>

<style lang="scss">
.imgText {
	h1 {
		text-align: center;
		font-size: 15px;
	}
	
	.gomeImgLoad {
		width: 100%;
		height: 100%;
	}
	
	padding: 0 5px;
}
</style>
