// pages/template/template.js
var utils = require("../../utils/utils.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getRemindData();
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    var picker_year = utils.getYear();
    var picker_month = utils.getMonth();
    var picker_day = utils.getDays(cur_year, cur_month);
    var picker_hours = utils.getHours();
    var picker_minutes = utils.getMinutes();
    var picker_value = utils.getTodayDate(picker_year, picker_month, picker_day, picker_hours, picker_minutes);
    console.log(picker_value);
    console.log(picker_year);
    console.log(picker_month);

    console.log(picker_day);
    console.log(picker_hours);
    console.log(picker_minutes);

    this.setData({
      picker_value: picker_value,
      picker_year,
      picker_month,
      picker_day,
      picker_hours,
      picker_minutes,
      show: true,
    })
  },


  getRemindData(){
      var lists =[];
      var item1 = [
        {
          "remindId": 10,
          "remindValue": "不提醒",
          "remindPosition": 0,
          "isChoose":false,
          "remindtime": null
        }
      ];
      var item2 =  [
          {
            "remindId": 11,
            "remindValue": "当天（10:00）",
            "remindPosition": 1,
            "isChoose": false,
            "remindtime": null
          },
          {
            "remindId": 12,
            "remindValue": "提前1天（10:00）",
            "remindPosition": 1,
            "isChoose": false,
            "remindtime": null
          }
        ];
      var item3 =  [
            {
              "remindId": 13,
              "remindValue": "提前2天（10:00）",
              "remindPosition": 2,
              "isChoose": false,
              "remindtime": null
            },
            {
              "remindId": 14,
              "remindValue": "提前3天（10:00）",
              "remindPosition": 2,
              "isChoose": false,
              "remindtime": null
            },
            {
              "remindId": 15,
              "remindValue": "提前1周（10:00）",
              "remindPosition": 2,
              "isChoose": false,
              "remindtime": null
            }
          ];
      lists.push(item1);
      lists.push(item2);
      lists.push(item3);
      this.setData({
        lists,
        remind_images:{
          ic_choose: "../images/ic_choose.png",
          ic_nochoose: "../images/ic_nochoose.png",
        }
      })
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: "true",
    // })
    // var that = this;

    // var url = 'https://appinter.sunwoda.com/schedule/getAllUser.json';
    // var method = 'POST';
    // var header = {
    //   'content-type': 'application/x-www-form-urlencoded'
    // };
    // var data = {
    //   userNo: userNo
    // }

    // app.func.getNetWork(url, method, header, data, function (res) {
    //   if (res) {
    //     if (res.data.statusCode == 0) {
    //       wx.hideLoading();
    //       items = res.data.dataInfo.listData;
    //       if (items.length == 0) {
    //         wx.showToast({
    //           title: "数据为空",
    //           icon: "loading",
    //           duration: 500,
    //           mask: "true",
    //         })
    //       } else {
    //         var sharePersons = [];
    //         for (var i = 0; i < items.length; i++) {
    //           var personChoose = false;
    //           sharePersons.push(personChoose);
    //         }
    //         that.setData({
    //           items: items,
    //           showShareStatus: true,
    //           // scheduleId,
    //           sharePersons,
    //         })
    //       }
    //     }
    //     else {
    //       wx.hideLoading();
    //       wx.showModal({
    //         title: '提示',
    //         content: res.data.message,
    //         showCancel: false,
    //         success: function (res1)
    //         { },
    //       });
    //     }
    //   } else {
    //     wx.hideLoading();
    //     wx.showModal({
    //       title: '提示',
    //       content: '网络不稳定，请稍后再试',
    //       showCancel: false,
    //       success: function (res) {
    //       }
    //     })
    //   }
  },

  /**
   * 提醒时间选择监听
   */
  onRemindListener(e){
    console.log(e);
    var lists = this.data.lists;
    if (e.currentTarget.dataset.pidx == 0 && e.currentTarget.dataset.cidx==0){
      for(var i=0; i<lists.length; i++){
        for(var j=0; j<lists[i].length; j++){
          if(i==0 && j==0){
            lists[i][j].isChoose = !lists[i][j].isChoose;
          }else{
            lists[i][j].isChoose = false;
          }
        }
      }
    }else{
      lists[0][0].isChoose=false;
      lists[e.currentTarget.dataset.pidx][e.currentTarget.dataset.cidx].isChoose = !lists[e.currentTarget.dataset.pidx][e.currentTarget.dataset.cidx].isChoose;
    }
    this.setData({
      lists:lists,
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
  
  }
})