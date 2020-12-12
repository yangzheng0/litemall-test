// pages/checkout/checkout.js
var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js')
var api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedAddress:{}
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
    // 页面展示
    wx.showLoading({
      title: '加载中...',
    })

    try {
      var cartId = wx.getStorageSync('cartId');
      if (cartId === "") {
        cartId = 0;
      }
      var addressId = wx.getStorageSync('addressId');
      if (addressId === "") {
        addressId = 0;
      }
      var couponId = wx.getStorageSync('couponId');
      if (couponId === "") {
        couponId = 0;
      }
      var userCouponId = wx.getStorageSync('userCouponId');
      if (userCouponId === "") {
        userCouponId = 0;
      }
      var grouponRulesId = wx.getStorageSync('grouponRulesId');
      if (grouponRulesId === "") {
        grouponRulesId = 0;
      }
      var grouponLinkId = wx.getStorageSync('grouponLinkId');
      if (grouponLinkId === "") {
        grouponLinkId = 0;
      }

      this.setData({
        cartId: cartId,
        addressId: addressId,
        couponId: couponId,
        userCouponId: userCouponId,
        grouponRulesId: grouponRulesId,
        grouponLinkId: grouponLinkId
      });
    }catch(e){
      console.log(e)
    }

    this.getCheckoutInfo();
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

  getCheckoutInfo: function() {
    let that = this;
    util.request(api.CartCheckout, {
      cartId: that.data.cartId,
      addressId: that.data.addressId,
      couponId: that.data.couponId,
      userCouponId: that.data.userCouponId,
      grouponRulesId: that.data.grouponRulesId
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          checkedGoodsList: res.data.checkedGoodsList,
          checkedAddress: res.data.checkedAddress,
          availableCouponLength: res.data.availableCouponLength,
          actualPrice: res.data.actualPrice,
          couponPrice: res.data.couponPrice,
          grouponPrice: res.data.grouponPrice,
          freightPrice: res.data.freightPrice,
          goodsTotalPrice: res.data.goodsTotalPrice,
          orderTotalPrice: res.data.orderTotalPrice,
          addressId: res.data.addressId,
          couponId: res.data.couponId,
          userCouponId: res.data.userCouponId,
          grouponRulesId: res.data.grouponRulesId,
        });
      }
      wx.hideLoading();
    });
  }
})