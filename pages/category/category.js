// pages/category/category.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    id:0,
    scrollLeft:0,
    currentCategory:{},
    scrollHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options 为页面跳转所带来的参数
    var that = this;
    if (options.id) {
      that.setData({
        id:parseInt(options.id)
      })
    }

    wx.getSystemInfo({
        success: function(res) {
          that.setData({
            scrollHeight:res.windowHeight
          })
      },
    })

    this.getCategoryInfo();
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

  getCategoryInfo: function () {
    let that = this;

    util.request(api.GoodsCategory, {
      id: this.data.id
    }).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          navList: res.data.brotherCategory,
          currentCategory:res.data.currentCategory
        })
      }
    })
  }
})