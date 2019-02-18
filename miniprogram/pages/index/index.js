//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list_data:[],
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }],
    // 遮罩层
    showModal: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({    //跳转到tabBar页面，并关闭其他所有tabBar页面
      // url: "/pages/listb/listb"
    })
  },
  onLoad: function (options) {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'https://easy-mock.com/mock/5adc3ba46b6af920eaf26380/json',
      // url:'http://m.lingdie.com/index.php?g=User&m=Baozhang&a=hahah',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          list_data: res.data.list,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

        })
        console.log(res)
      }
    }),
      //  高度自适应
      wx.getSystemInfo({
        success: function (res) {
          var clientHeight = res.windowHeight,
            clientWidth = res.windowWidth,
            rpxR = 750 / clientWidth;
          var calc = clientHeight * rpxR - 180;
          console.log(calc)
          that.setData({
            winHeight: calc
          });
        }
      });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  footerTap: app.footerTap,
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 遮罩层
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {

  },
  go: function () {
    this.setData({
      showModal: false
    })
  },
})