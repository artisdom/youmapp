export const App = {
  Tab: 'App.Tab',
  Navigation: 'App.Navigation',
  Login: 'App.Login',
  Tip: 'App.Tip',
  Menu: 'App.Menu',
  BasketVolume: 'App.BasketVolume'
}

export const Home = {
  Index: {
    Load: 'Home.Index.Load'
  },
  ScoreExch: {
    Load: 'Home.ScoreExch.Load',
    Bind: 'Home.ScoreExch.Bind',
  },
  Category: {
    Load: 'Home.Category.Load',
    Tab: 'Home.Category.Tab'
  },
  Center: {
    Load: 'Home.Center.Load',
    Reload: 'Home.Center.Reload',
    Reset: 'Home.Center.Reset'
  },
  Login: {
    Submit: 'Portal.Login.Submit',
    Reset: 'Portal.Login.Reset'
  },
  Regist: {
    Submit: 'Portal.Regist.Submit',
    Reset: 'Portal.Regist.Reset'
  },
  Findpwd: {
    Submit: 'Portal.Findpwd.Submit',
    Reset: 'Portal.Findpwd.Reset'
  },
  Basket: {
    Load: 'Order.Basket.Load',
    Reset: 'Order.Basket.Reset',
    Reload: 'Order.Basket.Reload',
    MoveDelete: 'Order.Basket.MoveDelete'
  },
}

export const Topic = {

}

export const Product = {
  Compound: {
    Load: 'Product.Compound.Load',
    Reset: 'Product.Compound.Reset'
  },
  Detail: {
    Load: 'Product.Detail.Load',
    SelectSpeic: 'Product.Detail.SelectSpeic',
    Store: 'Product.Detail.Store',
    LimitTime: 'Product.Detail.LimitTime',
    Reset: 'Product.Detail.Reset'
  },
  Comment: {
    Load: 'Product.Comment.Load',
    Reset: 'Product.Comment.Reset'
  },
  List: {
    Load: 'Product.List.Load',
    TopLoad: 'Product.List.TopLoad',
    Reset: 'Product.List.Reset',
  },
  TopList: {
    Load: 'Product.TopList.Load',
    Reset: 'Product.TopList.Reset',
  },
  Search: {
    Load: 'Product.Search.Load',
    Reset: 'Product.List.Reset',
  },
  TopicList: {
    Load: 'Product.TopicList.Load',
    Reset: 'Product.List.Reset',
  },
  VList: {
    Load: 'Product.VList.Load',
    Reset: 'Product.List.Reset',
  }
}

export const Order = {
  Confirm: {
    Load: 'Order.Confirm.Load',
    Submit: 'Order.Confirm.Submit',
    SelectTicket: 'Order.Confirm.SelectTicket',
    SelectPaytype: 'Order.Confirm.SelectPaytype',
    SelectDelivery: 'Order.Confirm.SelectDelivery',
    SelectReceive: 'Order.Confirm.SelectReceive',
    Reset: 'Order.Confirm.Reset'
  },
  ReceiveList: {
    Load: 'Order.ReceiveList.Load'
  },
  TicketList: {
    Load: 'Order.TicketList.Load'
  },
  Receive: {
    Load: 'Order.Receive.Load',
    Submit: 'Order.Receive.Submit',
    Reset: 'Order.Receive.Reset'
  },
}

export const Member = {
  OrderList: {
    Load: 'Member.OrderList.Load',
  },
  OrderDetail: {
    Load: 'Member.OrderDetail.Load',
    Reset: 'Member.OrderDetail.Reset'
  },
  OrderTrace: {
    Load: 'Member.OrderTrace.Load',
    Reset: 'Member.OrderTrace.Reset'
  },
  ProductStore: {
    Load: 'Member.ProductStore.Load'
  },
  ReceiveList: {
    Load: 'Member.ReceiveList.Load'
  },
  Receive: {
    Load: 'Member.Receive.Load',
    Submit: 'Member.Receive.Submit',
    Reset: 'Member.Receive.Reset'
  },
  Profile: {
    Load: 'Member.Profile.Load',
    Submit: 'Member.Profile.Submit',
    Reset: 'Member.Profile.Reset'
  },
  Setpwd: {
    Submit: 'Member.Setpwd.Submit',
    Reset: 'Member.Setpwd.Reset'
  },
  SetLoginEmail: {
    Submit: 'Member.SetLoginEmail.Submit',
    Reset: 'Member.SetLoginEmail.Reset'
  },
  SetLoginMobile: {
    Submit: 'Member.SetLoginMobile.Submit',
    Reset: 'Member.SetLoginMobile.Reset'
  },
  SetLoginName: {
    Submit: 'Member.SetLoginName.Submit',
    Reset: 'Member.SetLoginName.Reset'
  },
  ScoreLog: {
    Load: 'Member.ScoreLog.Load'
  },
  TicketList: {
    Load: 'Member.TicketList.Load'
  },
  ProductCommentList: {
    Load: 'Member.ProductCommentList.Load'
  },
  ProductComment: {
    Load: 'Member.ProductComment.Load',
    Submit: 'Member.ProductComment.Submit',
    Reset: 'Member.ProductComment.Reset'
  },
  Apply: {
    Load: 'Member.Apply.Load',
    Submit: 'Member.Apply.Submit',
    Reset: 'Member.Apply.Reset'
  },
  ApplyList: {
    Load: 'Member.ApplyList.Load',
    Reset: 'Member.ApplyList.Reset'
  }
}

export const Portal = {

}

export const TopCategory = {
  Yundong: 443,//运动
  Huwai: 30,//户外
  Yujia: 590,//瑜伽
  Nanxie: 12,//男鞋
  Nvxie: 13,//女鞋
  Tongzhu: 249,//童装
  Nanzhu: 14//男装
}

export const TopCategoryArray = [
  { id: TopCategory.Huwai, name: '户外' },
  { id: TopCategory.Yundong, name: '运动' },
  { id: TopCategory.Yujia, name: '瑜伽' },
  { id: TopCategory.Nanxie, name: '男鞋' },
  { id: TopCategory.Nvxie, name: '女鞋' },
  { id: TopCategory.Tongzhu, name: '童装' },
  { id: TopCategory.Nanzhu, name: '男装' }
];

export const Brand = {
  Camel: 1,
  Luotuo: 2,
}

export const WapTitle = '骆驼优品';