//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            'https://topic.camel.com.cn/module/wap_index_focus_201709/7645c28f-9674-49f0-8490-dca3f6237496.jpg?d=1',
            'https://topic.camel.com.cn/module/wap_index_focus_201709/cb445730-dda3-466e-ab17-60f1f6ca1cb7.jpg',
            'https://topic.camel.com.cn/module/wap_index_focus_201709/92b890bb-7182-4ba4-8bc7-3ffd7ebbcf1c.jpg'
        ],
        indicatorDots: true,  
        indicatorColor: '#fff',
        indicatorActiveColor: '#d2ab44',
        autoplay: true,
        interval: 5000,
        duration: 500,
        circular: true
    }
})
