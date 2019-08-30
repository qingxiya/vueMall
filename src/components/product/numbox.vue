<template>
	<div class="mui-numbox" data-numbox-min="1">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" 
		value="1" @change="getCountChanged" ref="numbox" />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
// 导入MUI js 在mui.min.js中最后一行加入 window.mui=mui; 可以不用导入该js
import mui from '../../lib/mui/js/mui.min.js'

export default{
	
	mounted(){ //实例完成前初始化好数字输入框
		mui('.mui-numbox').numbox()
	},
	methods:{
		getCountChanged(){//每当数字发生改变的时候把最新的数据返回给父组件
			this.$emit('getcount',parseInt(this.$refs.numbox.value))
		}
	},
	//拿到父组件传递过来的商品最大值
	props:['max'],
	watch:{
		// 使用JS API的方式设置控件的最大值
		'max':function(newVal,oldVal){
			mui('.mui-numbox').numbox().setOption('max',newVal)
		}
	}
}
</script>

<style></style>
