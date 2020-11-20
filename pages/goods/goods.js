// pages/goods/goods.js
var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js')
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canShare: false,
    id:0,
    goods:{},
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    attribute: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number:1,
    tmpPicUrl: '',
    checkedSpecText: '规格数量选择',
    tmpSpecText: '请选择规格数量',
    openShare: false,
    openAttr: false,
    isGroupon: false,
    checkedSpecPrice: 0,
    attribute:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.id) {
      this.setData({
        id: parseInt(options.id)
      })
      this.getGoodsInfo();
    }
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

  // 获取商品信息
  getGoodsInfo: function () {
    let that = this;
    util.request(api.GoodsDetail, {
      id: that.data.id
    }).then(function(res){
      if (res.errno === 0) {
        let _specificationList = res.data.productList;
        let _tmpPicUrl = res.data.productList[0].url;

        // 如果仅存在一种货品，那么商品页面初始化时默认为checked

        if (_specificationList.length == 1) {
          if (_specificationList[0].valueList.length == 1) {
            _specificationList[0].valueList[0].checked = true


            // 如果仅仅存在一种货品，那么商品价格应该和货品价格一致

            let _productPrice = res.data.productList[0].price;
            let _goodsPrice = res.data.info.retailPrice;

            if (_productPrice != _goodsPrice) {
              console.error('商品数量价格和货品不一致');
            }

            that.setData({
              checkedSpecText: _specificationList[0].valueList[0].value,
              tmpSpecText:'已选择：' + _specificationList[0].valueList[0].value
            })
          }
        }


        that.setData({
          goods:res.data.info,
          attribute:res.data.attribute,
          issueList:res.data.issue,
          comment:res.data.comment,
          canShare:res.data.share,
          brand:res.data.brand,
          checkedSpecPrice: res.data.info.retailPrice,
          specificationList: res.data.specificationList,
          tmpPicUrl: _tmpPicUrl
        })
      }
    }) 
  },
  shareFrindOrCircle: function() {
    if (this.data.openShare === false) {
      this.setData({
        openShare:!this.data.openShare
      })
    }else {
      return false;
    }
  },
  closeShare: function () {
    this.setData({
      openShare:false
    })
  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      })
    } 
  },

  closeAttr: function () {
    this.setData({
      openAttr: false
    })
  }
})