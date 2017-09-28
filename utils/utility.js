import Config from '../config';
import MemberState from './memberState';
import md5 from '../modules/crypto-js/md5';

export default class Utility {
  static parseInt(s) {
    let num = parseInt(s, 0);
    if (isNaN(num) === true) {
      return 0;
    }
    else {
      return num;
    }
  }
  static parseFloat(s) {
    let num = parseFloat(s, 0);
    if (isNaN(num) === true) {
      return 0;
    }
    else {
      return num;
    }
  }
  static windowScroll(document, callback) {
    if (document) {
      const range = 1;
      window.onscroll = () => {
        let scrollY = window.scrollY;
        let height = window.innerHeight;
        if (document.scrollHeight - range <= scrollY + height) {	//判断是否到底部
          if (callback) {
            callback();
          }
        }
      };
    }
  }
  static isWeiXin() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
  static getPageCount(record_count, page_size) {
    if (page_size === 0)
      return 0;
    var page_count = 1;
    if (record_count < page_size)
      page_count = 1;
    else if (record_count % page_size === 0)
      page_count = Math.floor(record_count / page_size);
    else
      page_count = Math.floor(record_count / page_size) + 1;
    return page_count;
  }
  static isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    return regex.test(email);
  }
  static isValidUsername(username) {
    var regex = /^([A-Za-z0-9_])+$/;
    return regex.test(username);
  }
  static jsonToFormData(json, noparams) {
    var formData = '';
    for (var name in json) {
      if (noparams !== undefined && noparams.indexOf(name + ',') > -1) {
        continue;
      }

      var value = json[name];
      if (value === true) {
        value = '1';
      }
      else if (value === false) {
        value = '0';
      }
      formData += '&' + name + '=' + value;
    }
    if (formData.length > 0) {
      return formData.substr(1);
    }
    else {
      return formData;
    }
  }
  //过滤掉url参数坏字符
  static filterUrlBad(urlStr) {
    if (urlStr) {
      const badArray = ['&', '=', '?', ':', '/', '#'];
      for (let bad of badArray) {
        urlStr = urlStr.replace(bad, '');
      }
    }
    return urlStr;
  }
  static md5(str) {
    let bytes = md5(str);
    return bytes.toString();
  }
  static sign(formData) {
    var sortStr = '';
    if (formData && formData.length > 0) {
      var formDataArray = formData.split('&');
      var sortArray = [];
      for (let i = 0; i < formDataArray.length; i++) {
        sortArray.push(formDataArray[i]);
      }
      sortArray.sort().reverse();
      for (let i in sortArray) {
        sortStr += '&' + sortArray[i];
      }
    }
    let bytes = md5(Config.Md5SignKey + sortStr);
    return bytes.toString();
  }
  static decodeURI(uri) {
    if (uri && uri.length > 0) {
      return decodeURIComponent(uri.toString().replace(/\+/g, '%20'));
    }
    return '';
  }
  static httpsURI(uri) {
    if (uri && uri.length > 0) {
      return uri.replace('http://', 'https://');
    }
    return '';
  }
  static timeDiff(time1, time2, format) {
    if (time1 < time2) {
      return 0;
    }
    if (format) {
      format = format.toLowerCase();
      if (format === 'd') {
        return (time1 - time2) / (24 * 60 * 60 * 1000);
      }
      else if (format === 'h') {
        return (time1 - time2) / (60 * 60 * 1000);
      }
      else if (format === 'm') {
        return (time1 - time2) / (60 * 1000);
      }
      else if (format === 's') {
        return (time1 - time2) / 1000;
      }
    }
    return (time1 - time2);
  }
  static timeAdd(time, num, format) {
    if (format) {
      format = format.toLowerCase();
      if (format === 'd') {
        return new Date(time.getTime() + (num * 24 * 60 * 60 * 1000));
      }
      else if (format === 'h') {
        return new Date(time.getTime() + (num * 60 * 60 * 1000));
      }
      else if (format === 'm') {
        return new Date(time.getTime() + (num * 60 * 1000));
      }
      else if (format === 's') {
        return new Date(time.getTime() + (num * 1000));
      }
    }
    return new Date(time.getTime() + (num * 1000));
  }
  static toFixed(number, fractionDigits) {
    if (number !== undefined) {
      let numberStr = number.toString();
      if (fractionDigits) {
        return parseFloat(numberStr).toFixed(fractionDigits);
      }
      else {
        return numberStr;
      }
    }
  }
  static timing(seconds) {
    if (seconds > 0) {
      let time_distance = seconds;
      let int_day = Math.floor(time_distance / 86400);
      time_distance -= int_day * 86400;
      let int_hour = Math.floor(time_distance / 3600);
      time_distance -= int_hour * 3600;
      let int_minute = Math.floor(time_distance / 60);
      time_distance -= int_minute * 60;
      let int_second = time_distance;
      let time = {};
      time.day = int_day;
      time.hour = int_hour;
      time.minute = int_minute;
      time.second = int_second;
      return time;
    }
    else {
      return { day: '0', hour: '0', minute: '0', second: '0' };
    }
  }
  static cloneJSON(json) {
    var JSON_SERIALIZE_FIX = { PREFIX: "[[JSON_FUN_PREFIX_", SUFFIX: "_JSON_FUN_SUFFIX]]" };
    var sobj = JSON.stringify(json, function (key, value) {
      if (typeof value === 'function') {
        return JSON_SERIALIZE_FIX.PREFIX + value.toString() + JSON_SERIALIZE_FIX.SUFFIX;
      }
      return value;
    });
    return JSON.parse(sobj, function (key, value) {
      if (typeof value === 'string' &&
        value.indexOf(JSON_SERIALIZE_FIX.SUFFIX) > 0 && value.indexOf(JSON_SERIALIZE_FIX.PREFIX) === 0) {
        let evel_str = "(" + value.replace(JSON_SERIALIZE_FIX.PREFIX, "").replace(JSON_SERIALIZE_FIX.SUFFIX, "") + ")";
        return eval(evel_str);
      }
      return value;
    }) || {};
  }
  static isLocal() {
    return window.location.hostname === 'localhost';
  }
  static async uploadFile(url, file, access) {
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      let command_url = Config.ApiHost + url;
      if (access) {
        let memberId = MemberLoginState.getLoginId();
        if (command_url.indexOf('?')) {
          command_url += '&member_id=' + memberId;
        }
        else {
          command_url += '?member_id=' + memberId;
        }
      }
      try {
        let responseData = await fetch(command_url, {
          method: 'POST',
          body: formData,
        }).then(response => response.json());

        return responseData;
      }
      catch (error) {
        console.error(error);
      }
      finally {

      }
    }
  }
  static dateFormat(date, fmt) { //author: meizz   
    var o = {
      "M+": date.getMonth() + 1,                 //月份   
      "d+": date.getDate(),                    //日   
      "h+": date.getHours(),                   //小时   
      "m+": date.getMinutes(),                 //分   
      "s+": date.getSeconds(),                 //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  static newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
        guid += "-";
    }
    return guid;
  }
  static dateAdd(date, strInterval, Number) {
    switch (strInterval) {
      case 's': return new Date(Date.parse(date) + (1000 * Number));
      case 'n': return new Date(Date.parse(date) + (60000 * Number));
      case 'h': return new Date(Date.parse(date) + (3600000 * Number));
      case 'd': return new Date(Date.parse(date) + (86400000 * Number));
      case 'w': return new Date(Date.parse(date) + ((86400000 * 7) * Number));
      case 'q': return new Date(date.getFullYear(), (date.getMonth()) + Number * 3, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
      case 'm': return new Date(date.getFullYear(), (date.getMonth()) + Number, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
      case 'y': return new Date((date.getFullYear() + Number), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }
  static dateDiff(strInterval, dateStart, dateEnd) {
    //如果是字符串转换为日期型   
    if (typeof dateEnd === 'string') {
      dateEnd = new Date(dateEnd);
    }
    switch (strInterval) {
      case 's': return parseInt((dateEnd - dateStart) / 1000);
      case 'n': return parseInt((dateEnd - dateStart) / 60000);
      case 'h': return parseInt((dateEnd - dateStart) / 3600000);
      case 'd': return parseInt((dateEnd - dateStart) / 86400000);
      case 'w': return parseInt((dateEnd - dateStart) / (86400000 * 7));
      case 'm': return (dateEnd.getMonth() + 1) + ((dateEnd.getFullYear() - dateStart.getFullYear()) * 12) - (dateStart.getMonth() + 1);
      case 'y': return dateEnd.getFullYear() - dateStart.getFullYear();
    }
  }
}

