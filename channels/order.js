import Config from '../config';
import Utility from '../utils/utility';
import MemberLoginState from '../utils/memberState';

export default class OrderChannel {
  constructor(options) {
    this.options = options;

    this.cache = {

    };
  }
  //获取购物车信息
  async getBasketData() {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/order/basket.aspx?member_id=' + memberId;
      let fetchHeaders = {
        'Content-Platform': 'wap'
      }
      try {
        let responseData = await fetch(command_url, { headers: fetchHeaders }).then(response => response.json());
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
  //删除购物车，basketId：购物车ID
  async deleteBasket(basketId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let post_data = 'basket_id=' + basketId;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let command_url = Config.ApiHost + '/order/basket.aspx?post=delete&member_id=' + memberId + '&' + post_data;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
  //清空购物车
  async clearBasket() {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let sign = Utility.sign('');
      let command_url = Config.ApiHost + '/order/basket.aspx?post=clear&member_id=' + memberId + '&sign=' + sign;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
  //新增商品到购物车，productIds：商品ID, specificateIds：货品规格ID, volumes：数量, locations：来源, images：商品图片
  async addBasket(productIds, specificateIds, volumes, locations, images) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/order/basket.aspx?post=add&member_id=' + memberId;
      let post_data = 'product_id=' + productIds + '&specificate_id=' + specificateIds + '&volume=' + volumes + '&location=' + locations;

      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign + '&image=' + Utility.decodeURI(images);
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
  //修改购物车商品数量，basketId：购物车ID, volume：数量
  async setBasketVolume(basketId, volume) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/order/basket.aspx?post=set_volume&member_id=' + memberId;
      let post_data = 'basket_id=' + basketId + '&volume=' + volume;
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
  //获取购物车商品数量
  async getBasketVolume() {
    let volume = 0;
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/order/basket.aspx?post=get_volume&member_id=' + memberId;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          volume = responseData.info.volume;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return volume;
  }
  //选择购物车商品，basketId：购物车ID，checkFlag：选择状态（1选择，2取消）
  async checkBasket(basketId, checkFlag) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let post_data = 'basket_id=' + basketId + '&check_flag=' + checkFlag;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let command_url = Config.ApiHost + '/order/basket.aspx?post=check&member_id=' + memberId + '&' + post_data;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
  //全选购物车，checkFlag：选择状态（1选择，2取消）
  async checkAllBasket(checkFlag) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let post_data = 'check_flag=' + checkFlag;
      let sign = Utility.sign(post_data);
      post_data += '&sign=' + sign;
      let command_url = Config.ApiHost + '/order/basket.aspx?post=allcheck&member_id=' + memberId + '&' + post_data;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
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
  //获取订单确认信息，ticketId：优惠券ID，deliveryId：配送方式, payType：付款方式, receiveId：收货信息ID, postBuyData：发送商品数据
  async getOrderConfirmData(ticketId, deliveryId, payType, receiveId, postBuyData) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/order/orderConfirm.aspx?member_id=' + memberId;
      let post_data = 'ticket_id=' + ticketId + '&delivery_id=' + deliveryId + '&pay_type=' + payType + '&receive_id=' + receiveId + '&' + postBuyData + '&location=';
      let fetchHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Platform': 'wap'
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
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
  //提交订单确认信息，ticketId：优惠券ID，deliveryId：配送方式, payType：付款方式, receiveId：收货信息ID, postBuyData：发送商品数据，invoice：发票信息
  async postOrderConfirm(ticketId, deliveryId, paytype, receiveId, postBuyData, invoice) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let src = localStorage.getItem('channel_src') || '';//来源
      let src_url = localStorage.getItem('channel_url') || '';//来源地址

      let command_url = Config.ApiHost + '/order/orderConfirm.aspx?post=place_order&member_id=' + memberId;
      let post_data = 'ticket_id=' + ticketId + '&delivery_id=' + deliveryId + '&pay_type=' + paytype + '&receive_id=' + receiveId + '&' + postBuyData;
      let sign = Utility.sign(post_data);
      post_data += '&post_script=&invoice=' + encodeURIComponent(invoice) + '&src=' + encodeURIComponent(src) + '&src_url=' + encodeURIComponent(src_url) + '&sign=' + sign;

      let fetchHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Platform': 'wap'
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return responseData.info.order_id;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return 0;
  }

  //获取运费补拍订单确认信息, postBuyData：发送商品数据
  async getReshootOrderConfirmData(postBuyData) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/order/reshootOrderConfirm.aspx?member_id=' + memberId;
      let post_data = postBuyData + '&location=';
      let fetchHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
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
  //提交运费补拍订单确认信息,paytype：付款方式，postScript：备注，postBuyData：发送商品数据
  async postReshootOrderConfirm(paytype, postScript, postBuyData) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/order/reshootOrderConfirm.aspx?post=place_order&member_id=' + memberId;
      let post_data = 'pay_type=' + paytype + '&platform=4&' + postBuyData;
      let sign = Utility.sign(post_data);
      post_data += '&post_script=' + encodeURIComponent(postScript) + '&sign=' + sign;
      let fetchHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      try {
        let responseData = await fetch(command_url, { method: 'POST', headers: fetchHeaders, body: post_data }).then(response => response.json());
        if (responseData.result === 1) {
          return responseData.info.order_id;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return 0;
  }
//获取订单支付信息，orderId：订单ID，openId：微信开放ID
  async getOrderPayData(orderId, openId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/order/orderPay.aspx?member_id=' + memberId + '&order_id=' + orderId + '&open_id=' + openId;
      let fetchHeaders = {
        'Content-Platform': 'wap'
      }
      try {
        let responseData = await fetch(command_url, { headers: fetchHeaders }).then(response => response.json());
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
}