// pages/coupon/coupon.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    couponList:[],
    showPage:false,
    count:0,
    page:1,
    limit:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList()
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
  getCouponList: function(){
    let that = this
    that.setData({
      scrollTop:0,
      showPage:false,
      couponList:[]
    })

    // 页面渲染完成
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:2000
    });

    util.request(api.CouponList,{
      page:that.data.page,
      limit:that.data.limit
    }).then(function(res){
      if(res.errno === 0) {
        that.setData({
          scrollTop:0,
          couponList:res.data.list,
          showPage:true,
          count:res.data.total
        })
      }

      wx.hideToast()
    })
  }
})