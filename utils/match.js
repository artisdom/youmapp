export default class Match {
  /// <summary>
  /// 是否必须
  /// </summary>
  static isRequired(value) {
    return value.trim().length > 0;
  }
  /// <summary>
  /// 匹配字符串长度
  /// </summary>
  static isRange(value, min, max) {
    if (max) {
      let match = '^[\S]{' + min.toString() + ',' + max.toString() + '}$';
      if (value.match(match) === false) {
        return false;
      }
    }
    else {
      if (!value.match('^[\S]{' + min + '}$')) {
        return false;
      }
    }
    return true;
  }
  /// <summary>
  /// 匹配整数
  /// </summary>
  static isNumber(value) {
    if (!value.match('^[0-9]*$')) {
      return false;
    }
    return true;
  }
  /// <summary>
  /// 匹配手机号码
  /// </summary>
  static isMobile(value) {
    if (!value.match('^[0-9]{11}$')) {
      return false;
    }
    return true;
  }
  /// <summary>
  /// 匹配中文和字母，全字母或全汉字字符
  /// </summary>
  static isCLetter(value) {
    if (!value.match('(^[A-Za-z]*$)|(^[\u4e00-\u9fa5]*$)')) {
      return false;
    }
    return true;
  }
  /// <summary>
  /// 匹配中文和字母，全字母或全汉字字符
  /// </summary>
  static isNumLetter(value) {
    if (!value.match('^[a-zA-Z0-9_]*$')) {
      return false;
    }
    return true;
  }
  /// <summary>
  /// 匹配电子邮箱
  /// </summary>
  static isEmail(value) {
    if (!value.match('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9\.-_])+$')) {
      return false;
    }
    return true;
  }
}