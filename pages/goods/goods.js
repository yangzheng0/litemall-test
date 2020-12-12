// pages/goods/goods.js
var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
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
    attribute:[],
    soldout:false
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
        let _specificationList = res.data.specificationList;
        let _tmpPicUrl = res.data.productList[0].url;

        // 如果仅存在一种货品，那么商品页面初始化时默认为checked
        console.log(_specificationList)
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
          productList: res.data.productList,
          // 选择规格时，默认展示第一张图片
          tmpPicUrl: _tmpPicUrl
        })

        // 如果是通过分享的团购参加团购，则团购项目应该与分享的一致并且不可更改
        if (that.data.isGroupon) {
          let groupons = that.data.groupon;
          for (var i = 0; i < groupons.length; i++) {
            if (groupons[i].id != that.data.grouponLink.rulesId) {
              groupons.splice(i, 1);
            }
          }
          groupons[0].checked = true;
          //重设团购规格
          that.setData({
            groupon: groupons
          });

        }

        if (res.data.userHasCollect == 1) {
          that.setData({
            collect: true
          });
        } else {
          that.setData({
            collect: false
          });
        }
        WxParse.wxParse('goodsDetail','html',res.data.info.detail,that)
        // 获取推荐商品
        that.getGoodsRelated()
      }
    }) 
  },

  // 获取推荐商品
  getGoodsRelated: function() {
    let that = this;
    util.request(api.GoodsRelated, {
      id: that.data.id
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          relatedGoods: res.data.list,
        });
      }
    });
  },

  // 开启分享
  shareFrindOrCircle: function() {
    if (this.data.openShare === false) {
      this.setData({
        openShare:!this.data.openShare
      })
    }else {
      return false;
    }
  },
  // 关闭分享
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
  },

  addToCart: function () {
    var that = this;
    if (this.data.openAttr == false) {
      // 打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      })
    } else {
      // 提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        util.showErrorToast("请选择完整规格")
        return false;
      }
      // 根据选中的规格，判断是否有对应的sku信息
      let checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey())
      if (!checkedProductArray || checkedProductArray.length <= 0) {
        util.showErrorToast("没有库存");
        return false;
      }

      let checkedProduct = checkedProductArray[0];
      // 验证库存
      if (checkedProduct.number <= 0) {
        util.showErrorToast("没有库存")
        return false
      }

      // 添加到购物车
      util.request(api.CartAdd, {
        goodsId: this.data.goods.id,
        number: this.data.number,
        productId: checkedProduct.id
      }, "POST")
      .then(function(res){
        let _res = res;
        if (_res.errno == 0) {
          wx.showToast({
            title: '添加成功',
          }) 

          that.setData({
            openAttr: !that.data.openAttr,
            cartGoodsCount: _res.data
          })

          if (that.data.userHasCollect == 1) {
            that.setData({
              collect: true
            })
          } else {
            that.setData({
              collect: false
            })
          }
        } else {
          util.showErrorToast(_res.errmsg)
        }
      })
    }
  },

  clickSkuValue: function (event) {
    let that = this;
    let specName = event.currentTarget.dataset.name;
    let specValueId = event.currentTarget.dataset.valueId;

    // 判断是否可以点击

    let _specificationList = this.data.specificationList;
    for (let i = 0; i <_specificationList.length; i++) {
      if (_specificationList[i].name === specName) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            // 如果选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }

    this.setData({
      specificationList: _specificationList,
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();

    //重新计算哪些值不可以点击
  },

  // 规格改变时，重新计算价格及显示信息
  changeSpecInfo: function() {
    let checkedNameValue = this.getCheckedSpecValue();

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function(v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function(v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        tmpSpecText: checkedValue.join('　')
      });
    } else {
      this.setData({
        tmpSpecText: '请选择规格数量'
      });
    }
    
    if (this.isCheckedAllSpec()) {
      this.setData({
        checkedSpecText: this.data.tmpSpecText
      });

      // 规格所对应的货品选择以后
      let checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProductArray || checkedProductArray.length <= 0) {
        this.setData({
          soldout: true
        });
        console.error('规格所对应货品不存在');
        return;
      }

      let checkedProduct = checkedProductArray[0];
      //console.log("checkedProduct: "+checkedProduct.url);
      if (checkedProduct.number > 0) {
        this.setData({
          checkedSpecPrice: checkedProduct.price,
          tmpPicUrl: checkedProduct.url,
          soldout: false
        });
      } else {
        this.setData({
          checkedSpecPrice: this.data.goods.retailPrice,
          soldout: true
        });
      }

    } else {
      this.setData({
        checkedSpecText: '规格数量选择',
        checkedSpecPrice: this.data.goods.retailPrice,
        soldout: false
      });
    }

  },

  //获取选中的规格信息
  getCheckedSpecValue: function() {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        name: _specificationList[i].name,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;
  },

  //判断规格是否选择完整
  isCheckedAllSpec: function() {
    return !this.getCheckedSpecValue().some(function(v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },

  getCheckedSpecKey: function() {
    let checkedValue = this.getCheckedSpecValue().map(function(v) {
      return v.valueText;
    })
    return checkedValue
  },

  getCheckedProductItem: function(key) {
    return this.data.productList.filter(function(v) {
      if (v.specifications.toString() == key.toString()) {
        return true
      } else {
        return false
      }
    })
  },
  openCartPage: function() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  }
})