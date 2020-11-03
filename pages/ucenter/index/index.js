// pages/ucenter/index/index.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickName:'点击登陆',
      avatarUrl:'/static/images/my.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.hasLogin) {
      let userInfo = wx.getStorageSync('userInfo');
        this.setData({
          userInfo: userInfo,
          hasLogin: true
        });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  goLogin(){
    if (!this.data.hasLogin) {
      wx.navigateTo({
        url: '/pages/auth/login/login',
      })
    }
  },
  goOrder() {
    if (this.data.hasLogin) {
      try{
        wx.setStorageSync('tab', 0);
      } catch (e) {
        console.log(e)
      }

      wx.navigateTo({
        url: "/pages/ucenter/order/order"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      })
    }
  }

})