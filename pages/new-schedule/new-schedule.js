// pages/new-schedule/new-schedule.js

var app = getApp();
var utils = require("../../utils/utils.js");
var top_current = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOneMonth:true,
    swiper_data : [],
    swiper_empty : [],
    swiper_schedules :[],
    showYearMonth: false,
    currentId:1,
    imageLists:{
      ic_add:"../images/ic_add.png",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    top_current=1;
    // if(this.data.isNavigateTo){
    //   this.setData({
    //     showScheduleOfDay: true,
    //     isNavigateTo:false,
    //     currentId:1,
    //   })
    // }else{
    //   this.setData({
    //     showScheduleOfDay: false,
    //     currentId: 1,
    //   })
    // }

    var info = wx.getSystemInfoSync();
    // console.log(info)
    var screenWidth = info.screenWidth;


    var pixelRatio = 750 / screenWidth;
    var windowHeight = info.windowHeight;
    var screenHeight = info.screenHeight;
    console.log(pixelRatio + "屏幕高度：" + windowHeight + "ddd:" + screenHeight);
    var height = windowHeight - 66;
    console.log(pixelRatio + "屏幕高度：" + height + "ddd:" + screenHeight);


    var date = new Date()
    var CURDAY = date.getDate();
    var CURMONTH = date.getMonth()+1;
    var CURYEAR = date.getFullYear();
    this.initData(date);

    this.setData({
      height: height,
      CURDAY: CURDAY,
      CURMONTH: CURMONTH,
      CURYEAR: CURYEAR,
    })

    var dateString = this.data.dateString;
    if (dateString) {
      this.querySchedule(dateString);
    }

  },

  /**
   * 日历初始化
   */
  initData(date) {
    // console.log(date);
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_hours = date.getHours() + 1;
    const cur_day = date.getDate();
    const cur_minutes = date.getMinutes();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    const cur_weeks = this.getCurrentWeeks(date);
    var bottom_month = cur_month;
    var bootom_year = cur_year;
    var top_month = cur_month;
    var top_year = cur_year;
    console.log(cur_year + ":" + cur_month + ":" + cur_day);
    if (cur_month==1){
      bottom_month=12;
      bootom_year--;
    }else{
      bottom_month--;
    }
    if (cur_month==12){
      top_month=1;
      top_year++;
    }else{
      top_month++;
    }
    // console.log(bootom_year + ":" + bottom_month);
    // console.log(top_year + ":" + top_month);
    this.calculateEmptyGrids(bootom_year, bottom_month,0);
    this.calculateDays(bootom_year, bottom_month,0);
    this.calculateEmptyGrids(cur_year, cur_month, 1);
    this.calculateDays(cur_year, cur_month, 1);
    this.calculateEmptyGrids(top_year, top_month, 2);
    this.calculateDays(top_year, top_month, 2);
    //默认获取“王总”的日程
    this.setData({
      choose_year: cur_year,
      choose_month: cur_month,
      choose_day: cur_day,
      choose_hours: cur_hours,
      choose_minutes: cur_minutes,
      choose_week: cur_weeks,
      cur_year,
      cur_month,
      childIdx: cur_day-1,
      cur_day: cur_day,
      cur_hours,
      cur_minutes,
      cur_weeks,
      weeks_ch,
      currentId:1,
    });
    this.initDayItem();
    // this.chooseYearAndMonth();
  },

  /**
   * 
   */

/**
 * 预加载下个月的数据
 * Type:0 表示下一个月   1表示上一月
 */
  prestrainNextData(cur_year, cur_month, Type, next_current){
    if(Type==0){
      if (cur_month == 12) {
        cur_month = 1;
        cur_year++;
      } else {
        cur_month++;
      }
    }else{
      if (cur_month < 2) {
        cur_month = 12;
        cur_year--;
      } else {
        cur_month--;
      }
    }

    console.log("当前预加载：" + cur_year + "月" + cur_month + "日" + next_current+"下标")
    this.calculateEmptyGrids(cur_year, cur_month, next_current);
    this.calculateDays(cur_year, cur_month, next_current);
  },

  /**
   * 点击
   */
  bindchangeTag(e) {

    var cur_year = this.data.cur_year;
    var cur_month = this.data.cur_month;
    var new_current = e.detail.current;
    var next_current;
    console.log(new_current)
    // console.log(e);
    if (this.data.isClickToday){

      this.setData({
        isClickToday:false,
      })
    }else{

    console.log(new_current + "<---" + top_current)
    if(new_current==2){
      if(top_current==0){     //右滑  月份减一
        next_current = 1
        if (cur_month < 2) {
          cur_month = 12;
          cur_year--;
        } else {
          cur_month--;
        }
        this.prestrainNextData(cur_year, cur_month, 1, next_current)
      } else {                  //左滑  月份加一
        next_current = 0
        if (cur_month == 12) {
          cur_month = 1;
          cur_year++;
        } else {
          cur_month++;
        }
        this.prestrainNextData(cur_year, cur_month, 0, next_current)
      }
    }
    else if(new_current==1){
      if (top_current == 2) {     //右滑  月份减一
        next_current = 0
        if (cur_month < 2) {
          cur_month = 12;
          cur_year--;
        } else {
          cur_month--;
        }
        this.prestrainNextData(cur_year, cur_month, 1, next_current)
      } else {                  //左滑  月份加一
        next_current = 2
        if (cur_month == 12) {
          cur_month = 1;
          cur_year++;
        } else {
          cur_month++;
        }
        this.prestrainNextData(cur_year, cur_month, 0, next_current)
      }
    }else{
      if (top_current == 1) {     //右滑  月份减一
        next_current = 2
        if (cur_month < 2) {
          cur_month = 12;
          cur_year--;
        } else {
          cur_month--;
        }
        this.prestrainNextData(cur_year, cur_month, 1, next_current)
      } else {                  //左滑  月份加一
        next_current = 1
        if (cur_month == 12) {
          cur_month = 1;
          cur_year++;
        } else {
          cur_month++;
        }
        this.prestrainNextData(cur_year, cur_month, 0, next_current)
      }
    }
    console.log("currentId：" + new_current)
    top_current = new_current;
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      currentId: new_current,
    })

    }
  },

  /**
    * 日期设置
    */
  /**
* 获取当前  星期几
*/
  getCurrentWeeks(date) {
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    var weeks_number = date.getDay();
    // console.log("数字  星期" + weeks_number);
    return weeks_ch[weeks_number];
  },

  // 计算每月有多少天
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // 计算每月第一天是星期几
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  // 计算在每月第一天在当月第一周之前的空余的天数
  calculateEmptyGrids(year, month, currentTag) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    var swiper_empty = this.data.swiper_empty;
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      swiper_empty[currentTag] = empytGrids;
      this.setData({
        hasEmptyGrid: true,
        empytGrids,
        swiper_empty,
      });
    } else {
      swiper_empty[currentTag] = [];
      this.setData({
        hasEmptyGrid: true,
        empytGrids: [],
        swiper_empty,
      });
    }
  },

  // 渲染日历格子
  calculateDays(year, month, currentTag) {
    this.oneMonthSchedule(year, month, currentTag);
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false
      });
    }
    var swiper_data = this.data.swiper_data;
    swiper_data[currentTag] = days;
    this.setData({
      days,

      swiper_data: swiper_data,
    });
  },

  /**
   * 获取某月的日程信息
   */
  oneMonthSchedule(year, month, currentTag){

  },




  // 递增、递减切换月份
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        showPicker: false,
        cur_year: newYear,
        cur_month: newMonth
      });

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        showPicker: false,
        cur_year: newYear,
        cur_month: newMonth
      });
    }
  },

  // 点击日期显示日历
  showCalendarListener(e) {
    this.setData({
      showOneMonth: true,
    })
  },

  /**
   * 初始默认点击
   */
  initDayItem() {
    var that = this;
    const days = this.data.swiper_data[top_current];
    if (this.data.childIdx){
      var idx = that.data.childIdx;
    }else{
      var idx = that.data.cur_day - 1;
    }
    console.log(days)
    console.log(that.data.childIdx+"???"+this.data.choose_day+"默认点击--"+idx)
    days[idx].choosed = !days[idx].choosed;
    console.log(days)
    var swiper_data = this.data.swiper_data;
    swiper_data[top_current] = days;
    this.setData({
      days: days,
      swiper_data: swiper_data,
    })
  },


  // 点击日历上某一天
  tapDayItem(e) {
    console.log(e);
    var parentIdx = e.currentTarget.dataset.parentidx;
    const childIdx = e.currentTarget.dataset.childidx;

    const days = this.data.swiper_data[parentIdx];
    // console.log(days);
    for (var i = 0; i < days.length; i++) {
      days[i].choosed = false;
    }
    const cur_hours = this.data.cur_hours;
    const cur_minutes = this.data.cur_minutes;
    //创建 时  分 
    const picker_value_time = [];
    let picker_hours = [],
      picker_minutes = [];

    for (let i = 1; i <= 24; i++) {
      picker_hours.push(i);
    }

    for (let i = 0; i <= 59; i++) {
      picker_minutes.push(i)
    }
    const idx_hours = picker_hours.indexOf(cur_hours);
    const idx_minutes = picker_minutes.indexOf(cur_minutes);
    var cur_day = childIdx + 1;
    const date = new Date(Date.UTC(this.data.cur_year, this.data.cur_month - 1, cur_day));
    console.log("当前" + this.data.cur_year + ":" + this.data.cur_month + ":" + cur_day);
    var cur_weeks = this.getCurrentWeeks(date)
    days[childIdx].choosed = !days[childIdx].choosed;
    var swiper_data = this.data.swiper_data;
    // console.log("top_current" + top_current);
    swiper_data[top_current] = days;
    this.setData({
      cur_day: cur_day,
      cur_weeks: cur_weeks,
      swiper_data: swiper_data,
      childIdx: childIdx,
      days,
    });


    var chooseYear = date.getFullYear();
    var chooseMonth = date.getMonth() + 1;
    var chooseDay = date.getDate();
    var chooseWeek = this.getCurrentWeeks(date);
    this.setData({
      parentIdx,
      childIdx,
      chooseYear,
      chooseMonth,
      chooseDay,
      chooseWeek,
      showScheduleOfDay:true,
    })
    var dateString = utils.transformDate2(chooseYear, chooseMonth, chooseDay);
    this.setData({
      dateString,
    })
    this.querySchedule(dateString);

  },



  // 点击年月调用picker选择器
  chooseYearAndMonth() {
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    var cur_day = this.data.cur_day;
    const cur_weeks = this.data.cur_weeks;
    console.log("cur_year:" + cur_year + "cur_month" + cur_month + "cur_day:" + cur_day)
    let picker_year = [],
      picker_day = [],
      picker_month = [];
    for (let i = 1900; i <= 2100; i++) {
      picker_year.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      picker_month.push(i);
    }
    var thisMonthDays = this.getThisMonthDays(cur_year,cur_month);
    if (cur_day>thisMonthDays){
      cur_day=1;
    }
    for (let i = 1; i <= thisMonthDays; i++){
      picker_day.push(i)
    }
    const idx_year = picker_year.indexOf(cur_year);
    const idx_month = picker_month.indexOf(cur_month);
    const idx_day = picker_day.indexOf(cur_day);
    console.log(cur_day)
    console.log(picker_day)
    console.log("idx_year:" + idx_year + "idx_month" + idx_month + "idx_day:" + idx_day)
    this.setData({
      picker_value: [idx_month, idx_day, idx_year],
      choose_year: cur_year,
      choose_month: cur_month,
      choose_day: cur_day,
      choose_week: cur_weeks,
      picker_year,
      picker_day,
      picker_month,
      showYearMonth: true
    });
  },

  // 当picker选择器值改变时
  pickerChange(e) {
    console.log(e);
    var that = this;
    const val = e.detail.value;
    var picker_day = []
    var choose_month = this.data.picker_month[val[0]];
    var choose_day = this.data.picker_day[val[1]];
    var choose_year = this.data.picker_year[val[2]]
    // 更改滚动选择器天数
    if (this.data.choose_month != this.data.picker_month[val[0]] || this.data.picker_year[val[2]] != this.data.choose_year){

      var thisMonthDays = this.getThisMonthDays(choose_year, choose_month);
      console.log(thisMonthDays+"");
      for (let i = 1; i <= thisMonthDays; i++) {
        picker_day.push(i)
      }
      that.setData({
        picker_day: picker_day,
      })
    }
    const date = new Date(Date.UTC(choose_year, choose_month-1 , choose_day));
    console.log(date)
    var choose_week = this.getCurrentWeeks(date)
    console.log("choose_year" + choose_year + "choose_month" + choose_month + "choose_day" + choose_day + "choose_week" + choose_week);

    this.setData({
      choose_year,
      choose_month,
      choose_day,
      choose_week
    })
  },


  // 确定picker结果
  tapPickerBtn(e) {
    var that = this;
    var isClickToday=false;
    if (top_current!=1){
      isClickToday=true
    }
    top_current=1;
    // var currentId = 1;
    const o = {
      showYearMonth: false,
      cur_year:that.data.choose_year,
      cur_month: that.data.choose_month,
      cur_day: that.data.choose_day,
      cur_weeks: that.data.choose_week,
      // currentId: currentId,

    };
    this.setData({
      swiper_schedules: [],
      swiper_data: [],
      swiper_empty: [],
      isPickerTrue:true,
      isClickToday,
    })
    var date = new Date(that.data.choose_year, that.data.choose_month-1, that.data.choose_day);
    console.log(date);
    this.setData(o);
    this.initData(date);
    // this.calculateEmptyGrids(that.data.choose_year, that.data.choose_month);
    // this.calculateDays(that.data.choose_year, that.data.choose_month);


  },

/**
 * 弹出框  点击今天
 */
  onTodayListener(e){

    var isClickToday = false;
    var date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;

    // const cur_hours = date.getHours();
    const cur_day = date.getDate();
    const cur_weeks = this.getCurrentWeeks(date);
    console.log("choose_year" + cur_year + "choose_month" + cur_month + "choose_day" + cur_day + "choose_week" + cur_weeks);
    var thisMonthDays = this.getThisMonthDays(cur_year, cur_month);
    var picker_day=[];
    for (let i = 1; i <= thisMonthDays; i++) {
      picker_day.push(i)
    }
    this.setData({
      picker_day: picker_day,
    })
    const idx_year = this.data.picker_year.indexOf(cur_year);
    const idx_month = this.data.picker_month.indexOf(cur_month);
    const idx_day = picker_day.indexOf(cur_day);

    console.log("choose_year" + idx_year + "choose_month" + idx_month + "choose_day" + idx_day );
    this.setData({

      isClickToday,
      picker_value: [idx_month, idx_day, idx_year],
      choose_year: cur_year,
      choose_month: cur_month,
      choose_day: cur_day,
      choose_hours: this.data.cur_hours,
      choose_minutes: this.data.cur_minutes,
      choose_week: cur_weeks,

    });  
  },
/**
 * 添加日程事件
 */
  addNewScheduleListener(e){
    var comeDate = this.data.dateString;
    var date = new Date();
    var hourse = date.getHours();
    var minutes = date.getMinutes();
    comeDate = comeDate+" "+hourse+":"+minutes
    wx.navigateTo({
      url: '../add-schedule/add-schedule?comeDate=' + comeDate,
    })
  },

/**
 * 点击灰色背景
 */
  powerDrawer(e){
    this.setData({
      showYearMonth:false,
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

      this.setData({
        showScheduleOfDay: false,
      })
      this.oneMonthSchedule(this.data.cur_year, this.data.cur_month, top_current);

    var info = wx.getSystemInfoSync();
    console.log(info)
    var screenWidth = info.screenWidth;
    var pixelRatio = 750 / screenWidth;
    var windowHeight = info.windowHeight;
    var screenHeight = info.screenHeight;
    console.log(pixelRatio + "屏幕高度：" + windowHeight + "ddd:" + screenHeight);
    var height = windowHeight - 65;
    console.log(pixelRatio + "屏幕高度：" + height + "ddd:" + screenHeight);

    // // var screenWidth = app.data.deviceInfo.screenWidth;
    // // var pixelRatio = 750 / screenWidth;
    // // var windowHeight = app.data.deviceInfo.windowHeight;
    // // var screenHeight = app.data.deviceInfo.screenHeight;
    // // console.log(pixelRatio + "屏幕高度：" + windowHeight + "ddd:" + screenHeight);
    // // var height = windowHeight - 65;
    // // console.log(pixelRatio + "屏幕高度：" + height + "ddd:" + screenHeight);
    // var date = new Date()
    // var CURDAY = date.getDate();
    // this.initData(date);

    // this.setData({
    //   height: height,
    //   CURDAY: CURDAY,
    // })

    var dateString = this.data.dateString;
    if(dateString){
      this.querySchedule(dateString);
    }

  },


/**
 * 某天日程界面JS
 */
  /**
   * 点击某天
   * 查询某天的日程
   */
  querySchedule(date) {
    var hasScheduleDay = false;

  },

  /**
   * 时间点击事件
   */
  onDateListener(e) {
    this.onShow();
    this.setData({
      showScheduleOfDay:false,
    })
  },
  /**
   * 标记完成
   */
  onFinishOnLister(e) {
    console.log(e);

  },
  /**
   * 日程点击事件
   */
  onScheduleItemListener(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var schedule_day_arrays = this.data.schedule_day_arrays
    var item = schedule_day_arrays[index];
    console.log(item)
    var isUrgent = item.isUrgent;
    //isUrgent==2    为生日时：显示弹出框
    if(isUrgent==2){
      // 获取人的信息
      var scheduleBegintime = item.scheduleBegintime;
      var scheduleBegintimeDateString = scheduleBegintime.replace(/-/g, "/");
      console.log(scheduleBegintimeDateString)
      var birthdayDate = new Date(Date.parse(scheduleBegintimeDateString));
      console.log(birthdayDate)
      var birthdayYear = birthdayDate.getFullYear();
      var birthdayMonth = birthdayDate.getMonth()+1;
      var birthdayDay = birthdayDate.getDate();
      var constellation = utils.getAstro(birthdayMonth, birthdayDay);
      var age = this.data.chooseYear - birthdayYear;
      var birthdayDateString = utils.cutDateToYMD(scheduleBegintime);
      var scheduleType = item.scheduleType;
      var birthdayData = {
        birthdayDateString: birthdayDateString,
        age: age,
        constellation: constellation,
        scheduleType: scheduleType,
        scheduleId: item.scheduleId,
        index: index,

      }
      that.setData({
        showBirthdayStatus:true,
        birthdayData: birthdayData,
      })
      console.log(birthdayData)
    }else{
      var scheduleId = item.scheduleId;
      wx.navigateTo({
        url: '../schedule-detail/schedule-detail?scheduleId=' + scheduleId,
      })
      that.setData({
        isNavigateTo:true,
      })
    }
  },

  /**
   * 生日弹出框关闭事件
   */
  onRCancelListener(e){
    this.setData({
      showBirthdayStatus: false,
    })
  },
/**
 * 生日弹出框编辑事件
 */
  onEditBirthdayListener(e){
    // console.log(e);
    var scheduleId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../birthday-add/brithday-add?scheduleId=' + scheduleId,
    })
    this.setData({
      showBirthdayStatus: false,
      showScheduleOfDay:false
    })
  },
  /**
   * 生日删除事件
   */
  onDeletBirthdayListener(e){
    console.log(e);
    var schedule_day_arrays = this.data.schedule_day_arrays;
    var scheduleId = e.currentTarget.dataset.id;
    var swiper_schedules = this.data.swiper_schedules;
    var childIdx = this.data.childIdx;
    var parentIdx = this.data.parentIdx;
    var scheduleMonthItem = swiper_schedules[parentIdx][childIdx];
    var index = e.currentTarget.dataset.index;
    var that = this;
    var url = 'https://appinter.sunwoda.com/schedule/removeScheduleNew.json';
    var method = 'POST';
    var header = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    var data = {
      scheduleId: scheduleId,
      // openid: openid
    }

    app.func.getNetWork(url, method, header, data, function (res) {
      if (res) {
        if (res.data.statusCode == 0) {
          console.log(scheduleMonthItem)
          scheduleMonthItem.splice(0, 1);
          swiper_schedules[parentIdx][childIdx] = scheduleMonthItem;

          schedule_day_arrays.splice(index, 1);
          console.log("删除第"+index);


          that.setData({
            schedule_day_arrays: schedule_day_arrays,
            swiper_schedules: swiper_schedules,
          })
        }
        else {
          // wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            success: function (res1)
            { },
          });
        }
      } else {
        // wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '网络不稳定，请稍后再试',
          showCancel: false,
          success: function (res) {
          }
        })
      }
    })

    this.setData({
      showBirthdayStatus: false,
    })
  },
/**
 * 事件劫持
 */
  onRCancelListener1(e){

  },

  /**
   * 搜索事件
   */
  onSearchListener(e){
    wx.navigateTo({
      url: '../search/search',
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
  
  }
})