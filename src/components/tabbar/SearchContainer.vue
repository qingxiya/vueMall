<template>
	<div>
	<mt-search
	  v-model="value"
	  background="#FFFFFF"
	  cancel-text="取消"
	  placeholder="搜索">
	</mt-search>
	</div>
</template>

<script>
export default{
	data(){
		return{
			value:''
		}
	},
	methods:{
		onSearch(){
			
		}
	}
}
</script>

<style scoped="scoped" lang="scss">
</style>
