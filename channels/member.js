import Config from '../config';
import Utility from '../utils/utility';
import MemberLoginState from '../utils/memberState';

export default class MemberChannel {
  constructor(options) {
    this.options = options;

    this.cache = {
      orderList: [],//订单数据
      storeList: [],//商品收藏数据
      scoreLogList: [],//积分记录数据
      ticketList: [],//优惠券数据
      commentList: [],//评价列表
      applyList: [],//售后申请数据
    };
  }
  //获取用户信息
  async getMemberInfo() {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/info.aspx?member_id=' + memberId;

      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData.info;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //获取用户资料
  async getProfile() {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/profile.aspx?member_id=' + memberId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData.info;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //保存用户资料，name：名称，sex：性别，birthYear：出生年，birthMonth：出生月，birthDay：出生日，area：地区ID
  async saveProfile(name, sex, birthYear, birthMonth, birthDay, area) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/profile.aspx?member_id=' + memberId + '&post=set_profile';
      let post_data = 'name=' + encodeURIComponent(name) + '&sex=' + sex + '&birth_year=' + birthYear + '&birth_month=' + birthMonth + '&birth_day=' + birthDay + '&area=' + area;
      let fetchHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //保存用户头像信息，headPortrait：头像图片
  async saveHeadPortrait(headPortrait) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/profile.aspx?member_id=' + memberId + '&post=set_portrait';
      let post_data = 'head_portrait=' + encodeURIComponent(headPortrait);
      let fetchHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //获取用户订单数据
  async getMemberOrderData() {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/index.aspx?member_id=' + memberId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData.info;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //获取订单列表，showStatus：显示状态，page：页码，pageSize：页数
  async getOrderList(showStatus, page, pageSize) {
    let data = [];
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/orderList.aspx?member_id=' + memberId + '&show_status=' + showStatus + '&page=' + page + '&page_size=' + pageSize;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
    }
    return data;
  }
  //获取订单物流跟踪，orderId：订单ID
  async getOrderTrace(orderId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/orderTrace.aspx?member_id=' + memberId + '&order_id=' + orderId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //获取订单详情，orderId：订单ID
  async getOrderDetail(orderId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/orderDetail.aspx?member_id=' + memberId + '&order_id=' + orderId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData.info;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //取消订单，orderId：订单ID
  async cancelOrder(orderId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/orderDetail.aspx?post=cancel&member_id=' + memberId;
      let post_data = 'order_id=' + orderId;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      try {
        let responseData = await fetch(command_url + '&' + post_data).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //确认订单收货，orderId：订单ID
  async receiveOrder(orderId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/orderDetail.aspx?post=receive&member_id=' + memberId;

      let post_data = 'order_id=' + orderId;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      try {
        let responseData = await fetch(command_url + '&' + post_data).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //获取商品收藏，page：页码，pageSize：页数
  async getProductStore(page, pageSize) {
    let data = [];
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/productStore.aspx?member_id=' + memberId + '&page=' + page + '&page_size=' + pageSize;

      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
    }
    return data;
  }
  //删除商品收藏，storeId：商品收藏ID
  async deleteProductStore(storeId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/productStore.aspx?post=delete&member_id=' + memberId;
      let post_data = 'store_id=' + storeId;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      try {
        let responseData = await fetch(command_url + '&' + post_data).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //获取收货信息，收货信息ID
  async getReceiveInfo(receiveId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId && receiveId > 0) {
      let command_url = Config.ApiHost + '/member/receive.aspx?member_id=' + memberId + '&receive_id=' + receiveId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData.info;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //删除收货信息，receiveId收货信息ID
  async deleteReceive(receiveId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/receive.aspx?post=delete&member_id=' + memberId;
      let post_data = 'receive_id=' + receiveId;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let fetchHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //保存收货信息，receiveId：收货ID, receiveName：收货人, receiveAddress：收货地址, receiveMobile：收货手机号, receiveRegion：收货地区, receiveDefault：默认
  async saveReceive(receiveId, receiveName, receiveAddress, receiveMobile, receiveRegion, receiveDefault) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/receive.aspx?post=save&member_id=' + memberId;
      let post_data = 'receive_id=' + receiveId + '&receive_name=' + Utility.filterUrlBad(receiveName) + '&receive_mobile=' + receiveMobile
        + '&receive_region=' + receiveRegion + '&receive_zipcode=&default_flag=' + receiveDefault;
      let sign = Utility.sign(post_data);
      post_data += '&receive_address=' + encodeURIComponent(receiveAddress) + '&sign=' + sign;
      let fetchHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        return responseData;
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //获取收货信息列表
  async getReceiveList() {
    let data = [];
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/receiveList.aspx?member_id=' + memberId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
    }
    return data;
  }
  //获取账户信息
  async getAccountData() {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/account.aspx?member_id=' + memberId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData.info;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return;
  }
  //发送修改密码，formPassword：密码
  async postSetPassword(formPassword) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/setPassword.aspx?member_id=' + memberId;
      let password = Utility.md5(formPassword);
      let post_data = 'password=' + password;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let fetchHeaders = {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //发送修改邮箱，loginEmail：邮箱
  async postSetLoginEmail(loginEmail) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/setLoginEmail.aspx?member_id=' + memberId;
      let post_data = 'login_email=' + loginEmail;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let fetchHeaders = {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //发送修改手机号，loginMobile：手机号
  async postSetLoginMobile(loginMobile) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/setLoginMobile.aspx?member_id=' + memberId;
      let post_data = 'login_mobile=' + loginMobile;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let fetchHeaders = {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //发送修改用户名，loginName：用户名
  async postSetLoginName(loginName) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/setLoginName.aspx?member_id=' + memberId;
      let post_data = 'login_name=' + loginName;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let fetchHeaders = {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //获取积分记录，page：页码，pageSize：页数
  async getScoreLog(page, pageSize) {
    let data = [];
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/scoreLog.aspx?member_id=' + memberId + '&page=' + page + '&page_size=' + pageSize;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
    }
    return data;
  }
  //获取优惠券列表，page：页码，pageSize：页数
  async getTicketList(page, pageSize) {
    let data = [];
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/ticketList.aspx?member_id=' + memberId + '&used_flag=-1&due_flag=-1&page=' + page + '&page_size=' + pageSize;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
    }
    return data;
  }
  //绑定优惠券，ticketCode：优惠券码
  async bindTicket(ticketCode) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/ticketList.aspx?post=bind&member_id=' + memberId;
      let post_data = 'ticket_code=' + Utility.filterUrlBad(ticketCode);
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let fetchHeaders = {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //获取评价列表，page：页码，pageSize：页数
  async getCommentList(page, pageSize) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/productCommentList.aspx?member_id=' + memberId + '&page=' + page + '&page_size=' + pageSize;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //获取订单评价数据，orderId：订单ID
  async getCommentData(orderId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/productComment.aspx?member_id=' + memberId + '&order_id=' + orderId;
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
  }
  //保存评价，orderItemId：订单明细ID, content：订单内容, imageUrlArray：图片URL数组, imageWidthArray：图片宽度数组, imageHeightArray：图片高度数组
  async saveComment(orderItemId, content, imageUrlArray, imageWidthArray, imageHeightArray) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/productComment.aspx?post=save&member_id=' + memberId;
      let post_data = 'orderitem_id=' + orderItemId + '&image=' + imageUrlArray.join(',') + '&image_w=' + imageWidthArray.join(',') + '&image_h=' + imageHeightArray.join(',');
      let sign = Utility.sign(post_data);
      post_data += '&content=' + encodeURIComponent(content) + '&sign=' + sign;
      let fetchHeaders = {
        "Content-Type": "application/x-www-form-urlencoded"
      }

      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //获取售后数据，applyId：申请ID, orderId：订单ID
  async getApplyData(applyId, orderId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/apply.aspx?member_id=' + memberId + '&apply_id=' + applyId + '&order_id=' + orderId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return responseData;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  //提交申请，orderId：订单ID, applyType：售后类型, title：标题, content：内容
  async saveApply(orderId, applyType, title, content) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/apply.aspx?post=apply&member_id=' + memberId;
      let post_data = 'order_id=' + orderId + '&type=' + applyType + '&title=' + Utility.filterUrlBad(title);

      let sign = Utility.sign(post_data);
      post_data += '&content=' + encodeURIComponent(content) + '&sign=' + sign;
      let fetchHeaders = {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //回复售后申请，applyId：申请ID，content：回复内容
  async replyApply(applyId, content) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/apply.aspx?post=reply&member_id=' + memberId;
      let post_data = 'apply_id=' + applyId;
      let sign = Utility.sign(post_data);
      post_data += '&content=' + encodeURIComponent(content) + '&sign=' + sign;
      let fetchHeaders = {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return true;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return false;
  }
  //获取售后记录，applyType：售后类型，page：页码，pageSize：页数
  async getApplyList(applyType, page, pageSize) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/member/applyList.aspx?member_id=' + memberId + '&apply_type=' + applyType + '&page=' + page + '&page_size=' + pageSize;
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
    return [];
  }

}