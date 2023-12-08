import redis, { RedisClientType } from 'redis';
import { Blockchain } from './Blockchain';

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
};

export class PubSub {
  publisher: RedisClientType;
  subscriber: RedisClientType;
  constructor(private blockChain: Blockchain) {
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(CHANNELS.TEST);
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

    this.subscriber.on('message', (channel, message) => {
      this.handleMessage(channel, message);
    });
  }

  handleMessage(channel: string, message: string) {
    console.log(`Message recieved.Channel: ${channel} Message: ${message}`);
    const parsedMessage = JSON.parse(message);

    if (channel == CHANNELS.BLOCKCHAIN) {
      this.blockChain.replaceChain(parsedMessage);
    }
  }
  publish(channel: string, message: string) {
    this.publisher.publish(channel, message);
  }
  broadchastChain() {
    this.publish(CHANNELS.BLOCKCHAIN, JSON.stringify(this.blockChain.chain));
  }
}
