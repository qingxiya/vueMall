import VueRouter from 'vue-router'

// 导入tabbar组件
import Home from './components/tabbar/HomeContainer.vue'
import Member from './components/tabbar/MemberContainer.vue'
import Cart from './components/tabbar/ShoppingCartContainer.vue'
import Search from './components/tabbar/SearchContainer.vue'
// 新闻列表
import NewsList from './components/news/newsList.vue'
// 新闻详情
import NewsInfo from './components/news/newsInfo.vue'
// 图片分享列表
import Images from './components/images/images.vue'
// 图片分享详情
import ImageInfo from './components/images/imagesInfo.vue'
// 商品列表
import ProductList from './components/product/productList.vue'
// 商品详情
import ProductInfo from './components/product/productInfo.vue'
// 商品图文详情
import ImageText from './components/product/imageText.vue'
//商品评论
import ProductComment from './components/product/productComment.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [
	  {path:'/',redirect:'/home'},
	  {path:'/home', component:Home},
	  {path:'/member', component:Member},
	  {path:'/shoppingCart', component:Cart},
	  {path:'/search', component:Search},
	  // 新闻咨询
	  {path:'/home/newsList',component:NewsList},
	  // 传id
	  {path:'/home/newsInfo/:id',component:NewsInfo},
	  // 图片分享
	  {path:'/home/images',component:Images},
	  {path:'/home/images/imagesInfo/:id',component:ImageInfo},
	  // 商品
	  {path:'/home/productList',component:ProductList},
	  {path:'/home/productInfo/:id',component:ProductInfo,name:"productInfo"},
	  {path:'/home/product/imageText/:id',component:ImageText,name:"imageText"},
	  {path:'/home/product/productComment/:id',component:ProductComment,name:"productComment"}
  ],
  // 设置点击图标高亮
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router