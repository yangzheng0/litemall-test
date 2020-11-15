// pages/cart/cart.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:false,
    cartGoods:[],
    cartTotal:0,
    checkedAllStatus: true
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
      this.getCartList();
    }

    this.setData({
      hasLogin:app.globalData.hasLogin
    })
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
  getCartList: function () {
    let that = this
    util.request(api.CartList).then(function(res){
      
      if(res.errno === 0) {
        that.setData({
          
          cartGoods: res.data.cartList,
          cartTotal:res.data.cartTotal
        })
      }
    })
  },
  goLogin() {
    wx.navigateTo({
      url: "/pages/auth/login/login"
    })
  },
  isCheckedAll: function() {
    // 判断购物车商品已全选
    return this.data.cartGoods.every(function(element,index,array){
      if (element.checked == true){
        return true;
      } else {
        return false;
      }
    })
  },
  checkedAll: function (event) {
    let that = this;

    if (!this.data.isEditCart) {
      var productIds = this.data.cartGoods.map(function(v) {
        return v.productId;
      });

      util.request(api.CartChecked, {
        productIds: productIds,
        isChecked: that.isCheckedAll() ? 0:1
      },'POST').then(function(res){
        if (res.errno === 0) {
          console.log(res.data);
          that.setData({
            cartGoods:res.data.cartList,
            cartTotal:res.data.cartTotal
          })
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        })
      })
    }
  },
  checkedItem: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;

    let productIds = [];
    productIds.push(that.data.cartGoods[itemIndex].productId);

    if (!this.data.isEditCart) {
      util.request(api.CartChecked,{
        productIds:productIds,
        isChecked:that.data.cartGoods[itemIndex].checked? 0 : 1
      }, 'POST').then(function(res) {
        if (res.errno === 0) {
          that.setData({
            cartGoods:res.data.cartList,
            cartTotal:res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus:that.isCheckedAll()
        })
      })
    }
  },
  editCart:function() {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart:!this.data.isEditCart
      });
    } else {
      // 编辑状态
      let tmpCartList =  this.data.cartGoods.map(function(v){
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList:this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus:that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      })
    }
  },
  getCheckedGoodsCount: function() {
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number;
      }
    });
    console.log(checkedGoodsCount)
    return checkedGoodsCount;
  },
  updateCart: function(productId, goodsId, number, id) {
    let that = this;

    util.request(api.CartUpdate, {
      productId: productId,
      goodsId: goodsId,
      number: number,
      id: id
    }, 'POST').then(function(res) {
      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });

  },
  cutNumber: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.number - 1 > 1) ? cartItem.number -1 : 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.productId, cartItem.goodsId, number, cartItem.id);
  }
})