import { Blockchain } from '../Blockchain';

const blockchain = new Blockchain();

blockchain.addBlock('New Data');

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, averageTime;

const times = [];

for (let i = 0; i < 1000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock(`block ${i}`);
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;

  timeDiff = nextTimestamp.getTime() - prevTimestamp.getTime();
  times.push(timeDiff);
  averageTime = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time to mine block :${timeDiff}ms , Difficulty:${nextBlock.difficulty},Average time:${averageTime}ms`
  );
}
