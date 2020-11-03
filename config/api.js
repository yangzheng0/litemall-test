// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:9080/wx/';

module.exports = {
  AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
  AuthLogout: WxApiRoot+'auth/logout' // 退出登录
}