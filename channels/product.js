import Config from '../config';
import Utility from '../utils/utility';
import MemberLoginState from '../utils/memberState';
import { TopCategoryArray } from '../constant';

export default class ProductChannel {
  constructor(options) {
    this.options = options;

    this.cache = {
      tagData: [],//标签数据
      categoryData: [],//商品类目数据
      productList: [],//商品列表
      commentList: [],//商品评价列表
      vproductList: [],//虚拟商品列表
      topicProductList: [],//优惠活动专题商品列表
      productSearch: [],//商品搜索列表
    };
  }
  //获取商品类目信息
  async getCategoryData() {
    if (this.cache.categoryData.length === 0) {
      let command_url = Config.ApiHost + '/category.aspx';
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          this.cache.categoryData = responseData.list;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return this.cache.categoryData;
  }
  //获取标签数据
  async getTagData() {
    if (this.cache.tagData.length === 0) {
      let command_url = Config.ApiHost + '/product/tagList.aspx';
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          this.cache.tagData = responseData.list;
        }
        else {
          console.warn(responseData.msg);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    return this.cache.tagData;
  }
  //获取商品信息，productId：商品ID
  async getProductInfo(productId) {
    let command_url = Config.ApiHost + '/product/productDetail.aspx?product_id=' + productId;

    try {
      let responseData = await fetch(command_url).then(response => response.json());
      if (responseData.result === 1) {
        return responseData.info.product;
      }
      else {
        console.warn(responseData.msg);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  //获取商品详情，productId：商品ID
  async getProductDetail(productId) {
    let command_url = Config.ApiHost + '/product/productDetail.aspx?product_id=' + productId;
    try {
      let responseData = await fetch(command_url).then(response => response.json());
      if (responseData.result === 1) {
        let memberId = MemberLoginState.getLoginIdStr();
        let spec_command_url = Config.ApiHost + '/handlers/getSpecificateListJson.ashx?product_id=' + productId + '&member_id=' + memberId;
        let responseSpecData = await fetch(spec_command_url).then(response => response.json());
        if (responseSpecData.result === 1) {
          return { productData: responseData.info, specificateData: responseSpecData.info };
        }
        else {
          console.warn(responseData.msg);
        }
      }
      else {
        console.warn(responseData.msg);
      }
    }
    catch (error) {
      console.error(error);
    }
    return null;
  }
  //获取商品优惠信息，productId：商品ID
  async getProductPrefer(productId) {
    let data = [];
    let memberId = MemberLoginState.getLoginIdStr();
    let command_url = Config.ApiHost + '/product/productDetail.aspx?post=get_prefer&product_id=' + productId + '&member_id=' + memberId;
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
  //收藏商品，productId：商品ID
  async addProductStore(productId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/product/productDetail.aspx?post=add_store&member_id=' + memberId;
      let post_data = 'product_id=' + productId;

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
  //取消收藏商品，productId：商品ID
  async deleteProductStore(productId) {
    let memberId = MemberLoginState.getLoginId();
    if (memberId) {
      let command_url = Config.ApiHost + '/product/productDetail.aspx?post=delete_store&member_id=' + memberId;
      let post_data = 'product_id=' + productId;

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
  //获取商品评价列表，productId：商品ID，page：页码，pageSize：页数
  async getProductCommentList(productId, page, pageSize) {
    let data = [];
    let memberId = MemberLoginState.getLoginIdStr();
    let command_url = Config.ApiHost + '/product/productDetail.aspx?post=get_comment&member_id=' + memberId + '&product_id=' + productId + '&page=' + page + '&page_size=' + pageSize;

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
    return data;
  }
  //获取商品列表，productClassId：商品类目ID，brand：商品品牌，sort：排序，page：页码，pageSize：页数
  async getProductList(productClassId, brand, sort, page, pageSize) {
    let data = [];
    let command_url = Config.ApiHost + '/product/productList.aspx?class_id=' + productClassId + '&brand=' + brand + '&sort=' + sort + '&page=' + page + '&page_size=' + pageSize;

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
    return data;
  }
  //获取顶级商品列表，productClassId：商品类目ID，pageSize：页数
  async getTopProductList(productClassId, pageSize) {
    let data = [];
    let command_url = Config.ApiHost + '/product/productList.aspx?post=toplist&class_id=' + productClassId + '&page_size=' + pageSize;

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
    return data;
  }
  //获取虚拟商品列表，vproductClassId：商品类目ID，sort：排序，page：页码，pageSize：页数
  async getVProductList(vproductClassId, sort, page, pageSize) {
    let data = [];
    let command_url = Config.ApiHost + '/product/vproductList.aspx?class_id=' + vproductClassId + '&sort=' + sort + '&page=' + page + '&page_size=' + pageSize;
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
    return data;
  }
  //获取优惠活动商品列表，vproductClassId：商品类目ID，preferId：优惠规则，page：页码，pageSize：页数
  async getTopicProductList(vproductClassId, preferId, page, pageSize) {
    let data = [];
    let command_url = Config.ApiHost + '/product/topicProductList.aspx?class_id=' + vproductClassId + '&prefer_id=' + preferId + '&page=' + page + '&page_size=' + pageSize;

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
    return data;
  }
  //获取搜索商品列表，keyword：关键字，sort：排序，page：页码，pageSize：页数
  async getProductSearch(keyword, sort, page, pageSize) {
    let data = [];
    let command_url = Config.ApiHost + '/product/productSearch.aspx?keyword=' + encodeURIComponent(keyword) + '&sort=' + sort + '&page=' + page + '&page_size=' + pageSize;

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
    return data;
  }
  //获取商品分类信息，productClassId商品分类ID
  async getProductClassInfo(productClassId) {
    let command_url = Config.ApiHost + '/product/productList.aspx?post=get_class&class_id=' + productClassId;
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
  //获取虚拟商品分类信息，productClassId商品分类ID
  async getVProductClassInfo(productClassId) {
    let command_url = Config.ApiHost + '/product/vproductList.aspx?post=get_class&class_id=' + productClassId;
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
  //获取优惠规则信息，preferId：优惠规则ID
  async getTopicProductPrefer(preferId) {
    let command_url = Config.ApiHost + '/product/topicProductList.aspx?post=get_prefer&prefer_id=' + preferId;
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