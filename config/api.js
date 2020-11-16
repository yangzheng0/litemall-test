// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:9080/wx/';

module.exports = {
  IndexUrl: WxApiRoot + 'home/index', //首页数据接口

  CatalogList: WxApiRoot + 'catalog/index', //分类目录全部分类数据接口
  CatalogCurrent: WxApiRoot + 'catalog/current', //分类目录当前分类数据接口
  
  AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
  AuthLogout: WxApiRoot+'auth/logout', // 退出登录

  GoodsCount: WxApiRoot + 'goods/count', //统计商品总数
  GoodsCategory: WxApiRoot + 'goods/category', //获得分类数据

  CartList: WxApiRoot + 'cart/index', //获取购物车的数据
  CartChecked: WxApiRoot + 'cart/checked', // 选择或取消选择商品
  CartUpdate: WxApiRoot + 'cart/update', // 更新购物车的商品

  UserIndex: WxApiRoot + 'user/index', //个人页面用户相关信息
}