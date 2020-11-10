// pages/catalog/catalog.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsCount: 0,
    currentCategory: {},
    currentSubCategoryList: [],
    categoryList: []
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
    this.getCatalog();
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
    wx.showNavigationBarLoading()
    this.getCatalog();
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
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
  getCatalog: function() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });

    util.request(api.CatalogList).then(function(res) {
      that.setData({
        categoryList: res.data.categoryList,
        currentCategory: res.data.currentCategory,
        currentSubCategoryList: res.data.currentSubCategory
      })
      wx.hideLoading()
    })

    util.request(api.GoodsCount).then(function(res){
      that.setData({
        goodsCount: res.data
      })
    })
  },
  switchCate: function (event) {
    var that = this
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }

    this.getCurrentCategory(event.currentTarget.dataset.id)
  },
  getCurrentCategory : function(id) {
    let that = this
    util.request(api.CatalogCurrent,{
      id:id
    }).then(function(res) {
      that.setData({
        currentCategory: res.data.currentCategory,
        currentSubCategoryList: res.data.currentSubCategory
      })
    } )
  }
})