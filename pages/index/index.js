//index.js
//获取应用实例
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    banner:[],
    channel:[],
    coupon:[],
    groupons:[],
    brands:[],
    newGoods:[],
    goodsCount:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getIndexData();
  },
  getIndexData: function() {
    let that = this
    util.request(api.IndexUrl).then(function(res){
      if (res.errno === 0) {
        that.setData({
          banner:res.data.banner,
          channel:res.data.channel,
          coupon: res.data.couponList,
          groupons: res.data.grouponList,
          newGoods: res.data.newGoodsList,
          brands: res.data.brandList
        })
      }
    })
  }
})
