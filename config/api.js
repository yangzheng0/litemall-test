// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:9080/wx/';

module.exports = {
  IndexUrl: WxApiRoot + 'home/index', //首页数据接口

  BrandDetail: WxApiRoot + 'brand/detail', //品牌详情
  BrandList: WxApiRoot + 'brand/list', //品牌列表

  CatalogList: WxApiRoot + 'catalog/index', //分类目录全部分类数据接口
  CatalogCurrent: WxApiRoot + 'catalog/current', //分类目录当前分类数据接口
  
  AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
  AuthLogout: WxApiRoot+'auth/logout', // 退出登录

  GoodsCount: WxApiRoot + 'goods/count', //统计商品总数
  GoodsCategory: WxApiRoot + 'goods/category', //获得分类数据
  GoodsDetail: WxApiRoot + 'goods/detail', //获得商品的详情
  GoodsRelated: WxApiRoot + 'goods/related', //商品详情页的关联
  GoodsList: WxApiRoot + 'goods/list', //获得商品列表商品（大家都在看）

  CartList: WxApiRoot + 'cart/index', //获取购物车的数据
  CartChecked: WxApiRoot + 'cart/checked', // 选择或取消选择商品
  CartUpdate: WxApiRoot + 'cart/update', // 更新购物车的商品
  CartAdd: WxApiRoot + 'cart/add', // 添加商品到购物车
  CartCheckout: WxApiRoot + 'cart/checkout', // 下单前信息确认

  CouponReceive: WxApiRoot + 'coupon/receive', //优惠券领取
  CouponList: WxApiRoot + 'coupon/list', //优惠券列表

  
  GroupOnList: WxApiRoot + 'groupon/list', //团购列表


  UserIndex: WxApiRoot + 'user/index', //个人页面用户相关信息


  TopicList: WxApiRoot + 'topic/list', //专题列表
  TopicDetail: WxApiRoot + 'topic/detail', //专题详情
  TopicRelated: WxApiRoot + 'topic/related', //相关专题

  CommentList: WxApiRoot + 'comment/list', //评论列表
  CommentCount: WxApiRoot + 'comment/count', //评论总数

  SearchHelper: WxApiRoot + 'search/helper', //搜索帮助
  SearchIndex: WxApiRoot + 'search/index', //搜索关键字
}