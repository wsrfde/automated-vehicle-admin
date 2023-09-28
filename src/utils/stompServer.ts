import { Client } from '@stomp/stompjs';
import { IFrame } from '@stomp/stompjs/src/i-frame';
import { StompConfig } from '@stomp/stompjs/src/stomp-config';

export default class StompClient {
  stompClient: Partial<Client> = {};

  stompConfig: StompConfig = {};

  constructor(topics: { topicUrl: string; callback: (e: any) => void }[]) {
    this.stompConfig = {
      brokerURL: process.env.WS_API,
      reconnectDelay: 200, // 失败重连时间，200毫秒
      // debug(str) {
      //   console.log(`STOMP: ${str}`);
      // },
      // 生命周期回调-连接成功
      onConnect: () => {
        topics.forEach((item) => {
          if (this.stompClient.subscribe) {
            // 返回实例中可以调用unsubscribe()方法，用来取消订阅
            this.stompClient.subscribe(item.topicUrl, (message) => {
              try {
                const payload = JSON.parse(message.body);
                item.callback(payload);
              } catch (e) {
                item.callback(message.body);
              }
            });
          }
        });
      },
      // 生命周期回调-连接关闭
      onDisconnect: () => {
        console.info('stomp连接关闭');
      },
      // 生命周期回调-发生错误
      onStompError: (frame: IFrame) => {
        console.info(`stomp报错:${frame.headers.message}`);
        console.info(`额外的细节:${frame.body}`);
      },
    };
  }

  connect() {
    this.stompClient = new Client(this.stompConfig);
    if (this.stompClient.activate) {
      this.stompClient.activate();
    }
  }

  destroy() {
    if (this.stompClient.deactivate) {
      this.stompClient.deactivate().then();
    }
  }
}
