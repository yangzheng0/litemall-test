// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:9080/wx/';

module.exports = {
  IndexUrl: WxApiRoot + 'home/index', //首页数据接口
  AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
  AuthLogout: WxApiRoot+'auth/logout' // 退出登录
}