/**
 * 根据type获取相应的颜色
 */
function getColorOfType(mType){
  var color;
  switch(mType){
      case '1':
        color= '#ffe3e3';
        break;
      case '2':
        color = '#e6eff8';
        break;
      case '3':
        color =  '#ffffff';
        break;
      
  }
  return color;
};
/**
 * 根据年月获取   月份天数
 */
function getDayOfYearMonth(year, month){
  return new Date(year, month, 0).getDate();
}

/**
 * 弹出框  点击今天
 */
function getTodayDate(picker_year, picker_month, picker_day, picker_hours, picker_minutes, picker_monorafter, cur_year1, cur_month1, cur_day1, cur_hours1, cur_minutes1){

  const cur_year = cur_year1;
  const cur_month = cur_month1;
  const cur_hours = cur_hours1;
  
  if(cur_hours>11){
    if(cur_hours>12){
      var cur_hours2 = cur_hours-12;
    }
    var cur_monorafter = 'PM';
  }else{
    var cur_monorafter = 'AM';
    var cur_hours2 = cur_hours
  }
  // console.log("cur_day1:" + cur_day1 + "cur_hours:" + cur_hours);
  const cur_day = cur_day1;
  const cur_minutes = cur_minutes1;
  if (cur_month<10){
    var cur_month2 = "0" + cur_month;
  }else{
    var cur_month2 = cur_month;
  }
  if (cur_day < 10) {
    var cur_day2 = "0" + cur_day;
  } else {
    var cur_day2 = cur_day;
  }
  if (cur_hours2 < 10) {
    var cur_hours3 = "0" + cur_hours2;
  
  } else {
    var cur_hours3 = cur_hours2;
  }
  if (cur_minutes < 10) {
    var cur_minutes2 = "0" + cur_minutes;
  } else {
    var cur_minutes2 = cur_minutes;
  }
  const idx_year = picker_year.indexOf(cur_year);
  const idx_month = picker_month.indexOf(cur_month2);
  const idx_day = picker_day.indexOf(cur_day2);
  const idx_monorafter = picker_monorafter.indexOf(cur_monorafter);
  const idx_hours = picker_hours.indexOf(cur_hours3);
  const idx_minutes = picker_minutes.indexOf(cur_minutes2);
  var picker_value = [idx_year, idx_month, idx_day, idx_hours, idx_minutes, idx_monorafter];
  // console.log(picker_value)
  // console.log(picker_year);
  // console.log(picker_month);
  // console.log(picker_day);
  // console.log(picker_hours);
  // console.log(picker_minutes);

  return picker_value;
}

/**
 * 获取星期几
 */
function getCurrentWeeks(date) {
  const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
  var weeks_number = date.getDay();
  // console.log("数字  星期" + weeks_number);
  return weeks_ch[weeks_number];
}

/**
 * 返回月份
 */
function getMonth()
{
  var picker_month=[];
  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      picker_month.push("0" + i);
    } else {
      picker_month.push(i)
    }
  }
  return picker_month;
}  
/**
 * 将 ****年**月**日转换为****-**-**
 */
function cutDate(date) 
{
  var dateArr = date.split("年");
  var year = dateArr[0];
  var dateArr2 = dateArr[1].split("月");
  var month = dateArr2[0];
  var day2 = dateArr2[1].split("日");
  var newDate = year+"-"+month+"-"+day2[0];
  return newDate;
}

/**
 * 返回 PM 和 AM根据24进制小时
 */
function checkAMAndPM(hours){
  if(hours>11){
    return "PM";
  }else{
    return "AM";
  }
}

/**
 * 传入时间  返回小时
 */
function getHoursOfTime(time){
  var timeArr = time.split(":");
  var hours = parseInt(timeArr[0]);
  return hours;
}

/**
 * 将12小时制的时间  转换成24小时制的时间
 */
function changTimePM(time){
  var timeArr = time.split(":");
  var hours = parseInt(timeArr[0]) + 12;
  if(hours==24){
    hours = "12";
  }else{
    hours=hours+"";
  }
  var newTime = hours+":"+timeArr[1];
  return newTime;
}
function changTimeAM(time) {
  var timeArr = time.split(":");
  var hours = parseInt(timeArr[0]);
  if (hours == 12) {
    hours = "00";
  } else {
    hours = hours + "";
  }
  var newTime = hours + ":" + timeArr[1];
  return newTime;
}

/**
 * 返回年份
 * */
 function getYear(){
   let picker_year = [];
   for (let i = 1900; i <= 2100; i++) {
     picker_year.push(i);
   }
   return picker_year;
 }

 /**
  * 返回天数
  */
  function getDays(cur_year, cur_month){
    var picker_day = [];
    var thisMonthDays = this.getDayOfYearMonth(cur_year, cur_month);
    // console.log(thisMonthDays)
    for (let i = 1; i <= thisMonthDays; i++) {
      if(i<10){
        picker_day.push("0"+i);
      }else{
        picker_day.push(i)
      }
    }
    return picker_day;
  }

  /**
   * 返回小时数
   */
  function getHours(){
    var picker_hours = [];
    for (var i=1; i<=12; i++){
      if (i < 10) {
        picker_hours.push("0" + i);
      } else {
        picker_hours.push(i)
      }
    }
    return picker_hours;
  }

  /**
   * 返回分钟数
   */
  function getMinutes(){
    var picker_minutes = [];
    for(var i=0; i<=59; i++){
      if (i < 10) {
        picker_minutes.push("0" + i);
      } else {
        picker_minutes.push(i)
      }
    }
    return picker_minutes;
  }

  /**
   * 传入  年  月 日   返回  日期（****年**月**日）
   */
  function transformDate(year, month, day){

    return year + "年" + month + "月" + day+"日";
  }
  /**
 * 传入  年  月 日   返回  日期（****-**-**）
 */
  function transformDate2(year, month, day) {
    var month2 = month;
    var day2 = day;
    if (month < 10) {
      month2 = "0" + month;
    }
    if (day < 10) {
      day2 = "0" + day;
    }
    return year + "-" + month2 + "-" + day2;
  }

  /**
   * 传入 ****-**-** **:**  转换成  年  月 日
   */
  function cutDateToYMD(date){
    var dateArr = date.split("-");
    var year = dateArr[0];
    var month = dateArr[1];
    var day = dateArr[2].split(" ");
    var newDate = year + "年" + month + "月" + day[0]+"日";
    return newDate;
  }

  /**
   * 传入 ****-**-** **:**  返回时间  **：**
   */
  function cutDateToTime(date) {
    var dateArr = date.split(" ");
    var time = dateArr[1];
    var times = time.split(":");
    var hours = times[0];
    var minuten = times[1];
    return time;
  }


  /**
   * 传入  小时   分钟  返回（**：** AM）
   */
  function transformTime(hours, minutes){
    // console.log("hours:"+hours)
    var hours = hours;
    var Hours = hours;
    var Minutes = minutes;
    if (hours>12){
      Hours = hours-12;
    }

    if (Hours<10){
      Hours = "0" + Hours;
    }
    if (Minutes < 10) {
      Minutes = "0" + Minutes;
    }
    return Hours+":"+Minutes;
  }

  /**
 * 将24小时制的时间  转换成12小时制的时间
 */
  function changHourse24To12(hourse){
    var hours = parseInt(hourse);
    if (hours > 12) {
      hours = hours - 12;
      if (hours < 10) {
        hours = "0" + hours;
      }
    } else
      if (hours == 0) {
        hours = "12";
      } else if (hours < 10) {
        hours = "0" + hours;
      }
    return hours;
  }

    function changMinuse(minuse){
      var minuse1 = parseInt(minuse);
      if (minuse1 < 10) {
        minuse1 = "0" + minuse1;
    } 
      return minuse1;
  }

  function changTime24To12(time) {
    var timeArr = time.split(":");
    var hours = parseInt(timeArr[0]);
    if(hours>12){
      hours=hours-12;
      hours = "0"+hours;
    }else
    if (hours == 0) {
      hours = "12";
    } else if (hours<10){
      hours = "0" + hours;
    }
    var newTime = hours + ":" + timeArr[1];
    return newTime;
  }

  /**
   * 传入两个数组 A   B 返回 A中元素在B的位置
   */
  function arrayLocation(A, B){
    var C=[];
    for (var b in B){
      var tag =false;
      for (var a in A){
        if (A[a].userNo == B[b].userNo){
          tag=true
        }
      }
      C.push(tag);
    }
    return C;
  }

  /**
   * 根据年月获取星座
   */
  function getAstro(month, day) {
    var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
  }

  /**
   * 传入  2018-01-24 11:05 返回 date
   */
  function changString2Date(dateString){
    var curDate = dateString.replace(/-/g, "/");
    var date = new Date(Date.parse(curDate));
    return date;
  }
/**
 * 将数组按照  生日-->紧急日程-->普通日程-->已完成日程排序
 * 
 */
  function changArray2Sort(scheduleArra){
    var scheduleBirArra = [];         //生日数组
    var scheduleWorkArraUrg = [];       //紧急日程数组
    var scheduleWorkNor = [];           //普通日程数组
    var newScheduleArra = [];
    for(i in scheduleArra){
      var scheduleItem = scheduleArra[i];
      if (scheduleItem.isUrgent==2){
        scheduleBirArra.push(scheduleItem);
      } else if (scheduleItem.isUrgent == 1){
        scheduleWorkArraUrg.push(scheduleItem);
      }else{
        scheduleWorkNor.push(scheduleItem);
      }
    }
  

  }

module.exports = {
  changString2Date: changString2Date,
  getDayOfYearMonth: getDayOfYearMonth,
  getTodayDate: getTodayDate,
  getDays: getDays,
  getYear: getYear,
  getMonth: getMonth,
  getCurrentWeeks: getCurrentWeeks,
  getHours: getHours,
  getMinutes: getMinutes,
  transformDate: transformDate,
  transformTime: transformTime,
  cutDate: cutDate,
  changTimeAM: changTimeAM,
  changTimePM: changTimePM,
  transformDate2: transformDate2,
  cutDateToYMD: cutDateToYMD,
  arrayLocation: arrayLocation,
  checkAMAndPM: checkAMAndPM,
  cutDateToTime: cutDateToTime,
  changTime24To12: changTime24To12,
  changHourse24To12: changHourse24To12,
  changMinuse: changMinuse,
  getAstro:getAstro,
  getHoursOfTime: getHoursOfTime,
}