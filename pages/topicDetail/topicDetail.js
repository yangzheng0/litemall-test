// pages/topicDetail/topicDetail.js
var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    topicDetail:{},
    topic:{},
    topicGoods:[],
    topicList:[],
    commentList:[],
    commentCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options 为页面跳转所带来的参数
    var that = this
    that.setData({
      id:options.id
    })

    util.request(api.TopicDetail, {
      id:that.data.id
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          topic:res.data.topic,
          topicGoods:res.data.goods
        });
      }

      WxParse.wxParse('topicDetail', 'html', res.data.topic.content, that)
    })

    util.request(api.TopicRelated, {
      id:that.data.id
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          topicList:res.data.list
        });
      }
    })
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
    this.getCommentList()
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

  // 获取评论列表
  getCommentList() {
    let that = this
    util.request(api.CommentList,{
      valueId: that.data.id,
      type:1,
      showType:0,
      page:1,
      limit:5
    }).then(function(res){
      if (res.errno === 0) {
        this.setData({
          commentList: res.data.list,
          commentCount: res.data.total
        })
      }
    })
  }
})