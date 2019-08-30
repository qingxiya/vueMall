import Vue from 'vue'

//导入vuex 状态管理器 
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站先从本地存储中将购物车的数据读取出来
var car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
	state: { //通过this.$store.state.***
		car: car//在car数组中存储商品的对象 id,价格，数量，是否选中
	},
	mutations: { //通过this.$store.commit('方法名'，'按需传递唯一参数')
		addToCar(state, productInfo) {
			//点击加入购物车，把商品保存到store中的car上
			var flag = false
			state.car.some(item => {
				if (item.id === productInfo.id) {
					item.count += parseInt(productInfo.count)
					flag = true
					return true
				}
			})
			// 如果最终循环完毕的flag还是false则把商品直接push给car
			if (!flag) {
				state.car.push(productInfo)
			}
			// 更新car数组后将数据存储到localStorage中去
			localStorage.setItem('car',JSON.stringify(state.car))
		}
	},
	getters: { //通过this.$store.getters.***
		getAllCount(state) { //获得商品添加到购物车的总数量
			var c = 0;
			// if(car===null){
			// 	return c
			// }
			state.car.forEach(item => {
				c += item.count
			})
			return c
		}
	}
})

// 暴露实例
export default store