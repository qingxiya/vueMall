import Vue from 'vue'

//导入vuex 状态管理器 
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站先从本地存储中将购物车的数据读取出来
var car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
	state: { //通过this.$store.state.***
		car: car //在car数组中存储商品的对象 id,价格，数量，是否选中
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
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateCar(state, productInfo) {
			// 修改购物车数量
			state.car.some(item => {
				if (item.id == productInfo.id) {
					item.count = parseInt(productInfo.count)
					return true
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		del(state, id) { //删除
			state.car.some((item, i) => {
				if (item.id == id) {
					state.car.splice(i, 1)
					return true
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		changeSelectd(state, info) {
			state.car.some(item => {
				if (item.id == info.id) {
					item.selectd = info.selectd
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))
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
		},
		getProductCount(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.count
			})
			return o
		},
		getProductSelectd(state) { //商品勾选状态
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.selectd
			})
			return o
		},
		getProductAllMoney(state){ //总勾选量和总价
			var o={
				count:0, //勾选数量
				amount:0 //勾选总价
			}
			state.car.forEach(item=>{
				if(item.selectd){
					o.count +=item.count
					o.amount +=item.price	* item.count
				}
			})
			return o
		}
	}
})

// 暴露实例
export default store
