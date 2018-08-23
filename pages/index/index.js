//index.js
const app = getApp()
// import ajax from "../../utils/ajax"
Page({
  data: {
    menuIndex: 0,
    menuList:[
      {
        value:'热销',
        id: 'hot'
      },
      {
        value:'折扣',
        id: 'cheap'
      },
      {
        value:'新品推荐',
        id: 'new'
      },
      {
        value:'精品冷菜',
        id: 'cold'
      },
      {
        value:'精品小菜',
        id: 'small'
      },
      {
        value:'五谷杂粮',
        id: 'cereals'
      },
      {
        value:'天然饮品',
        id: 'natural'
      },
      {
        value:'时尚酷饮',
        id: 'fashion'
      },
      {
        value:'服务承诺',
        id: 'service'
      }
    ],
    orientate: 'hot',
    cookList: app.globalData.cookList,
    price: 0,
    cartList: app.globalData.cartList,
    showList:false
  },
  changePrice(event) {
    var total = 0
    app.globalData.cartList = []
    app.globalData.cookList.map((item,index) => {
      item.cookBd.map((child, idx) => {
        if (child.num > 0) {
          total += child.price * child.num
          app.globalData.cartList.push(child)
        }
      })
    })
    this.setData({
      price:total,
      cartList: app.globalData.cartList
    })
  },
  handleMinus(event) {
    var total = 0
    let item = event.currentTarget.dataset.item
    item.num--
    app.globalData.cookList.map((element, index) => {
      element.cookBd.map((child, idx) => {
        if (child.id === item.id) {
          child.num = item.num
        }
        if (child.num > 0) {
          total += child.price * child.num
        }
      })
    })
    app.globalData.cartList.map((element, index) => {
      if (element.id === item.id) {
        element.num = item.num
        if (element.num <=0){
          app.globalData.cartList.splice(index,1)
        }
      }
    })
    this.setData({
      price: total,
      cookList: app.globalData.cookList,
      cartList: app.globalData.cartList
    })
  },
  handlePlus(event) {
    var total = 0
    let item = event.currentTarget.dataset.item
    item.num++
    app.globalData.cookList.map((element, index) => {
      element.cookBd.map((child, idx) => {
        if (child.id === item.id) {
          child.num = item.num
        }
        if (child.num > 0) {
          total += child.price * child.num
        }
      })
    })
    app.globalData.cartList.map((element, index) => {
      if (element.id === item.id) {
        element.num = item.num
      }
    })
    this.setData({
      price: total,
      cookList: app.globalData.cookList,
      cartList: app.globalData.cartList
    })
  },
  changeIndex(event) {
    this.setData({
      menuIndex: event.currentTarget.dataset.index,
      orientate: event.currentTarget.dataset.id
    })
  },
  handleCart() {
    this.setData({
      showList: !this.data.showList
    })
  },
  goPay(event){
    wx.showModal({
      title: '订单提交',
      content: '确定提交',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  onShow() {
  },
  onHide() {
  },
  onLoad() {
    /*ajax({
      url: `/endpoint/login/captcha.jpg`,
      method: "get",
      data: {
      }
    }).then(res=>{
      // console.log(111,res)
    })*/
  }
})
