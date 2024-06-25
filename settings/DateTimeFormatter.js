"use strict";
class DateTimeFormatter {
  // 获取当前时间并格式化成年-月-日 时:分:秒的字符串格式
  static getCurrentDateTime() {
    var currentDate = /* @__PURE__ */ new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = currentDate.getDate();
    day = day < 10 ? "0" + day : day;
    var hours = currentDate.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = currentDate.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var seconds = currentDate.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var formattedDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return formattedDateTime;
  }
  // 获取当前时间后6秒并格式化成年-月-日 时:分:秒的字符串格式
  static getCurrentDateTimeAfterSeconds(Second) {
    var currentDateAfter6Seconds = new Date(Date.now() + Second * 1e3);
    var year = currentDateAfter6Seconds.getFullYear();
    var month = currentDateAfter6Seconds.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = currentDateAfter6Seconds.getDate();
    day = day < 10 ? "0" + day : day;
    var hours = currentDateAfter6Seconds.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = currentDateAfter6Seconds.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var seconds = currentDateAfter6Seconds.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var formattedDateTimeAfter6Seconds = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return formattedDateTimeAfter6Seconds;
  }
}
exports.DateTimeFormatter = DateTimeFormatter;
