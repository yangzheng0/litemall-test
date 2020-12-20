// pages/topicCommentPost/topicCommentPost.js
var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:{},
    valueId:0,
    stars: [0, 1, 2, 3, 4],
    starText: '十分满意',
    star:5,
    content:'',
    picUrls:[],
    files:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (parseInt(options.type) !== 1) {
      return;
    }

    var that = this;
    that.setData({
      valueId:options.valueId
    })
    that.getTopic();
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
  getTopic() {
    let that = this
    util.request(api.TopicDetail,{
      id:that.data.valueId
    }).then(function(res) {
      that.setData({
        topic:res.data.topic
      })
    })
  }
})