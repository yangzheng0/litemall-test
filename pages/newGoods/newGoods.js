// pages/newGoods/newGoods.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerInfo:{
      'imgUrl':'/static/images/new.png',
      'name':'大家都在买的'
    },
    goodsList:[],
    page:1,
    limit:10,
    currentSortOrder:'defalut',
    currentSort:'add_time',
    currentSortOrder:'desc',
    categoryId:0,
    filterCategory:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList();
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
  getGoodsList: function() {
    var that = this
    util.request(api.GoodsList,{
      isNew:true,
      page:that.data.page,
      limit:that.data.limit,
      order:that.data.currentSortOrder,
      sort:that.data.currentSort,
      categoryId:that.data.categoryId
    })
    .then(function(res){
      if (res.errno === 0) {
        that.setData({
          goodsList:res.data.list,
          filterCategory:res.data.filterCategoryList
        })
      }
    })
  },
  openSortFilter:function(event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          categoryFilter: !this.data.categoryFilter,
          currentSortType:'category',
          currentSort:'add_time',
          currentSortOrder:'desc'
        })
        break;
      case 'priceSort': 
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }  
        this.setData({
          currentSortType: 'price',
          currentSort: 'retail_price',
          currentSortOrder: tmpSortOrder,
          categoryFilter:false
        })
        this.getGoodsList();
        break;
      default: 
        // 综合排序
        this.setData({
          currentSortType: 'default',
          currentSort: 'add_time',
          currentSortOrder:false,
          categoryId:0
        })
        this.getGoodsList()
    }
  },

  selectCategory: function(event) {
    let currentIndex = event.target.dataset.categoryIndex;
    this.setData({
      'categoryFilter':false,
      'categoryId':this.data.filterCategory[currentIndex].id
    });
    this.getGoodsList();
  }
})