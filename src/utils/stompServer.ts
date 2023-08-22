import { Client } from '@stomp/stompjs';

export default class StompClient {
  constructor(topics) {
    this.stompClient = {};
    this.stompConfig = {
      brokerURL: process.env.WS_API,
      reconnectDelay: 200, // 失败重连时间，200毫秒
      // debug(str) {
      //   console.log(`STOMP: ${str}`);
      // },
      // 生命周期回调-连接成功
      onConnect() {
        // 返回实例中可以调用unsubscribe()方法，用来取消订阅
        topics.forEach((item) => {
          // 这里在onConnect中this的指向为new StompClient实例，所以直接调用subscribe方法即可
          this.subscribe(item.topicUrl, (message) => {
            const payload = JSON.parse(message.body);
            item.callback(payload);
          });
        });
      },
      // 生命周期回调-连接关闭
      onDisconnect() {
        console.info('stomp连接关闭');
      },
      // 生命周期回调-发生错误
      onStompError() {
        console.info(`stomp报错:${frame.headers.message}`);
        console.info(`额外的细节:${frame.body}`);
      },
    };
  }

  connect() {
    this.stompClient = new Client(this.stompConfig);
    this.stompClient.activate();
  }

  destroy() {
    this.stompClient.deactivate();
  }
}
