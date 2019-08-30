<template>
	<div>
		<Comment :id="this.id"></Comment>
	</div>
</template>

<script>
import Comment from '../comments/comments.vue'
export default {
	data() {
		return {
			id: this.$route.params.id
		};
	},
	components:{
		Comment
	}
};
</script>

<style></style>
