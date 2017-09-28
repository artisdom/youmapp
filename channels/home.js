import Config from '../config';
import Utility from '../utils/utility';
import MemberLoginState from '../utils/memberState';

//首页数据获取接口
export default class HomeChannel {
  constructor(options) {
    this.options = options;

    this.cache = {
      hotProductData: [],//热门商品数据
      pageModuleData: [],//页面模块数据
      pageListData: []//列表模块数据
    };
  }
  //查找页面模块缓存
  findPageModuleCache(code) {
    let item = this.cache.pageModuleData.find((item, index) => {
      return item.code === code;
    });
    if (item) {
      return item.data;
    }
  }
  //查找列表模块缓存
  findPageListCache(code) {
    let item = this.cache.pageListData.find((item, index) => {
      return item.code === code;
    });
    if (item) {
      return item.list;
    }
    else {
      return [];
    }
  }
  //获取列表模块数据并装入缓存，listCode：模块编码，page：页码，pageSize：页数
  async getPageProductList(listCode, page, pageSize) {
    let data = this.findPageListCache(listCode + '_' + page);
    if (data.length === 0) {
      let command_url = Config.ApiHost + '/index.aspx?post=list&code=' + listCode + '&page=' + page + '&page_size=' + pageSize;
      let fetchHeaders = {
        'Content-Platform': 'wap'
      }
      try {
        let responseData = await fetch(command_url, { headers: fetchHeaders }).then(response => response.json());
        if (responseData.result === 1) {
          data = responseData.list;
          if (data.length > 0) {
            this.cache.pageListData.push({ code: listCode + '_' + page, list: data });
          }
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return data;
  }
  //获取页面模块数据并装入缓存，moduleCode：模块编码
  async getPageModuleList(moduleCode) {
    let data = this.findPageModuleCache(moduleCode);
    if (!data) {
      let command_url = Config.ApiHost + '/index.aspx?post=module&code=' + moduleCode;
      let fetchHeaders = {
        'Content-Platform': 'wap'
      }
      try {
        let responseData = await fetch(command_url, { headers: fetchHeaders }).then(response => response.json());
        if (responseData.result === 1) {
          data = responseData;
          this.cache.pageModuleData.push({ code: moduleCode, data });
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return data;
  }
  //获取兑换优惠券数据，ticketActivityIdArray：优惠券活动ID组合（001,002,003）
  async getScoreExchTicketList(ticketActivityIdArray) {
    let data = [];
    let command_url = Config.ApiHost + '/scoreExchange.aspx?tid=' + ticketActivityIdArray;
    let fetchHeaders = {
      'Content-Platform': 'wap'
    }
    try {
      let responseData = await fetch(command_url, { headers: fetchHeaders }).then(response => response.json());
      if (responseData.result === 1) {
        data = responseData.list;
      }
      else {
        console.warn(responseData.msg);
      }
    }
    catch (error) {
      console.error(error);
    }
    return data;
  }
  //积分兑换优惠券，ticketActivityId：优惠券活动ID
  async scoreExchTicket(ticketActivityId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let post_data = 'exch_id=' + ticketActivityId;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let command_url = Config.ApiHost + '/scoreExchange.aspx?post=exch_ticket&member_id=' + memberId + '&' + post_data;
      let fetchHeaders = {
        'Content-Platform': 'wap'
      }
      try {
        let responseData = await fetch(command_url, { headers: fetchHeaders }).then(response => response.json());
        return responseData;
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //获取搜索热门词列表
  async getSearchKeyword() {
    let command_url = Config.ApiHost + '/search.aspx';
    try {
      let responseData = await fetch(command_url).then(response => response.json());
      if (responseData.result === 1) {
        return responseData.list;
      }
      else {
        console.warn(responseData.msg);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  //判断是否存在电子邮箱
  async existsEmail(email) {
    let command_url = Config.ApiHost + '/handlers/existsLoginEmail.ashx?email=' + email;
    try {
      let responseData = await fetch(command_url).then(response => response.text());
      return responseData === '1' ? true : false;
    } catch (error) {
      console.error(error);
    }
    return false;
  }
  //判断是否存在手机号
  async existsMobile(mobile) {
    let command_url = Config.ApiHost + '/handlers/existsLoginMobile.ashx?mobile=' + mobile;
    try {
      let responseData = await fetch(command_url).then(response => response.text());
      return responseData === '1' ? true : false;
    } catch (error) {
      console.error(error);
    }
    return false;
  }
  //判断是否存在用户名
  async existsName(userName) {
    let command_url = Config.ApiHost + '/handlers/existsLoginName.ashx?login_name=' + userName;
    try {
      let responseData = await fetch(command_url).then(response => response.text());
      return responseData === '1' ? true : false;
    } catch (error) {
      console.error(error);
    }
    return false;
  }
  //发送邮箱验证码
  async sendEmailCode(email) {
    let command_url = Config.ApiHost + '/handlers/sendEmailSmsCode.ashx';
    let post_data = 'email=' + email;
    let sign = Utility.sign(post_data);
    post_data += '&sign=' + sign;
    let fetchHeaders = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    try {
      let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
      if (responseData.result === 1) {
        return responseData.code;
      }
      else {
        console.warn(responseData.msg);
      }
    } catch (error) {
      console.error(error);
    }
  }
  //发送手机验证码
  async sendMobileCode(mobile) {
    let command_url = Config.ApiHost + '/handlers/sendMobileSmsCode.ashx';
    let post_data = 'mobile=' + mobile;
    let sign = Utility.sign(post_data);
    post_data += '&sign=' + sign;
    let fetchHeaders = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    try {
      let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
      if (responseData.result === 1) {
        return responseData.code;
      }
      else {
        console.warn(responseData.msg);
      }
    } catch (error) {
      console.error(error);
    }
  }
}