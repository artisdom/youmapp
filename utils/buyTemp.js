
const sessionkey = 'buyTemp';
const typeSessionkey = 'buyTempType';
export default class BuyTemp {
  static clear() {
    sessionStorage.removeItem(sessionkey);
  }
  static addBuy(specificateId, volume, location, image) {
    const buyTempData = { specificateIdArray: [specificateId], volumeArray: [volume], locationArray: [location], imageArray: [image] };

    sessionStorage.setItem(sessionkey, JSON.stringify(buyTempData));
    sessionStorage.setItem(typeSessionkey, 'buy');
  }
  static addBasketBuy(specificateIds, volumes, locations, images) {
    const buyTempData = { specificateIdArray: specificateIds, volumeArray: volumes, locationArray: locations, imageArray: images };

    sessionStorage.setItem(sessionkey, JSON.stringify(buyTempData));
    sessionStorage.setItem(typeSessionkey, 'basket');
  }
  static addCompoundBuy(specificateIds, prices, volume, location, images) {
    const buyTempData = { specificateIdArray: specificateIds, priceArray: prices, volumeArray: [volume], locationArray: [location], imageArray: images };

    sessionStorage.setItem(sessionkey, JSON.stringify(buyTempData));
    sessionStorage.setItem(typeSessionkey, 'compound');
  }
  static addTeamBuy(teamId, specificateId, volume, location, image) {
    const buyTempData = { teamIdArray: [teamId], specificateIdArray: [specificateId], volumeArray: [volume], locationArray: [location], imageArray: [image] };

    sessionStorage.setItem(sessionkey, JSON.stringify(buyTempData));
    sessionStorage.setItem(typeSessionkey, 'team');
  }
  static joinPostData() {
    const jsonStr = sessionStorage.getItem(sessionkey);
    if (!jsonStr) {
      console.warn('没有购买的商品');
      return;
    }
    const buyTempData = JSON.parse(jsonStr);
    const buyTempType = sessionStorage.getItem(typeSessionkey);
    var postData = '';
    switch (buyTempType) {
      case 'buy': postData = 'specificate=' + buyTempData.specificateIdArray.join(',') + '&volume=' + buyTempData.volumeArray.join(',') + '&location=' + buyTempData.locationArray.join(',') + '&image=' + buyTempData.imageArray.join(',');
        break;
      case 'basket': postData = 'specificate=' + buyTempData.specificateIdArray.join(',') + '&volume=' + buyTempData.volumeArray.join(',') + '&location=' + buyTempData.locationArray.join(',') + '&image=' + buyTempData.imageArray.join(',');
        break;
      case 'compound': postData = 'specificate=' + buyTempData.specificateIdArray.join(',') + '&volume=' + buyTempData.volumeArray.join(',') + '&price=' + buyTempData.priceArray.join(',') + '&location=' + buyTempData.locationArray.join(',') + '&image=' + buyTempData.imageArray.join(',');
        break;
      case 'team': postData = 'team_id=' + buyTempData.teamIdArray.join(',') + 'specificate=' + buyTempData.specificateIdArray.join(',') + '&volume=' + buyTempData.volumeArray.join(',') + '&location=' + buyTempData.locationArray.join(',') + '&image=' + buyTempData.imageArray.join(',');
        break;
      default: postData = '';
        break;
    }
    return postData;
  }
  static getProductVolume() {
    let volume = 0;
    const jsonStr = sessionStorage.getItem(sessionkey);
    if (jsonStr) {
      const buyTempData = JSON.parse(jsonStr);
      for (let volumeItem of buyTempData.volumeArray) {
        volume += volumeItem;
      }
    }
    return volume;
  }
  static getBuyType() {
    return sessionStorage.getItem(typeSessionkey);
  }
}

