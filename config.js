//基本配置信息
const Config = {
  ApiHost: window.location.hostname === 'localhost' ? 'http://172.18.130.235' : 'https://app.you.camel.com.cn',
  Md5SignKey: 'cames#82',//md5签名秘钥
}

export default Config;