// pages/topicComment/topicComment.js
var app = getApp();
var util = require('../../utils/util.js');

var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allCount:0,
    hasCount:0,
    showType:0,
    allCommonList:[],
    allPage:1,
    picCommonList:[],
    picPage:1,
    comments:[],
    valueId:0,
    type:0,
    limit:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type,
      valueId:options.valueId
    })
    this.getCommentCount();
    this.getCommentList();
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
  switchTab() {
    let that = this
    if (that.data.showType == 0) {
      this.setData({
        allCommonList:[],
        allPage:1,
        commonts:[],
        showType:1
      })
    } else {
      this.setData({
        picCommonList:[],
        picPage:1,
        commonts:[],
        showType:0
      })
    }
    this.getCommentList();
  },
  getCommentList() {
    let that = this
    util.request(api.CommentList, {
      valueId:that.data.valueId,
      type:that.data.type,
      limit:that.data.limit,
      page: (that.data.showType == 0 ? that.data.allPage : that.data.picPage),
      showType:that.data.showType,
    }).then(function(res){
      if(res.errno === 0) {
        if (that.data.showType == 0){
          that.setData({
            allCommonList:that.data.allCommonList.concat(res.data.list),
            allPage:res.data.page,
            comments:that.data.allCommonList.concat(res.data.list)
          })
        } else {
          that.setData({
            picCommonList:that.data.picCommonList.concat(res.data.list),
            picPage:res.data.page,
            comments:that.data.allCommonList.concat(res.data.list)
          })
        }
      }
    })
  },
  getCommentCount() {
    let that = this;
    util.request(api.CommentCount,{
      valueId: that.data.valueId,
      type: that.data.type
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          allCount:res.data.allCount,
          hasPicCount:res.data.hasPicCount
        })
      }
    })
  }
})