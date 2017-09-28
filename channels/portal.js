import Config from '../config';
import Utility from '../utils/utility';

export default class PortalChannel {
  constructor(options) {
    this.options = options;

    this.cache = {
      regionData: [],//地区数据
    };
  }

  //获取通用配置
  async getGeneralConfig() {
    let command_url = Config.ApiHost + '/config.aspx';
    try {
      let responseData = await fetch(command_url).then(response => response.json());
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }
  //获取帮助信息，code编码
  async getHelpData(code) {
    if (code && code.length > 0) {
      let command_url = Config.ApiHost + '/portal/help.aspx?code=' + code;
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        if (responseData.result === 1) {
          return { title: responseData.info.title, faq_list: responseData.list };
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
  //获取地区数据
  async getRegionData() {
    if (this.cache.regionData.length === 0) {
      let command_url = Config.ApiHost + '/temp/region.json';
      try {
        let responseData = await fetch(command_url).then(response => response.json());
        this.cache.regionData = responseData;
      }
      catch (error) {
        console.error(error);
      }
    }
    return this.cache.regionData;
  }
}