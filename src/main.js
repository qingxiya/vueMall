// 入口文件
import Vue from 'vue'

// 导入路由和安装
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 导入store实例
import store from './store.js'

// 配置全局的post表单请求格式
Vue.http.options.emulateJSON = true;

// 配置数据根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';

// 导入App.vue组件
import app from './App.vue'

// 导入MUI
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/js/mui.min.js'
// 图片分享中导航栏所需的js脚本
import './lib/mui/js/webviewGroup.js'

// 引入饿了么组件
import {
	Header,
	Swipe,
	SwipeItem,
	Button,
	Lazyload
} from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);
Vue.use(MintUI)
import { Search } from 'mint-ui';
Vue.component(Search.name, Search);

// vant
import { CouponCell, CouponList } from 'vant';
Vue.use(CouponCell).use(CouponList);
import { Popup } from 'vant';
Vue.use(Popup);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
import { Tag } from 'vant';
Vue.use(Tag);


// 导入格式化插件
import moment from 'moment'

// 缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 时间格式化全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return moment(dataStr).format(pattern)
})

// 导入路由
import router from './router.js'

Vue.component(Header.name, Header);

var vm = new Vue({
	el: '#app',
	data: {

	},
	methods: {

	},
	render: c => c(app),
	// 挂载路由
	router,
	// 挂载状态管理器
	store
})
