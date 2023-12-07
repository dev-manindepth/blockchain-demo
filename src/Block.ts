import hexToBinary from 'hex-to-binary';
import { GENESIS_DATA, MINE_RATE } from './config/config';
import { generateHash } from './utils/HashGenerator';

export class Block {
  timestamp: Date;
  prevHash: string;
  hash: string;
  data: any;
  difficulty: number;
  nonce: number;
  constructor(
    timestamp: Date,
    prevHash: string,
    hash: string,
    nonce: number,
    difficulty: number,
    data: any
  ) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    const { timestamp, prevHash, hash, nonce, difficulty, data } = GENESIS_DATA;
    return new this(timestamp, prevHash, hash, nonce, difficulty, data);
  }
  static mineBlock(prevBlock: Block, data: any) {
    let hash, timestamp;
    const prevHash = prevBlock.hash;
    let difficulty = prevBlock.difficulty;

    let nonce = 0;
    do {
      nonce++;
      timestamp = new Date();
      difficulty = Block.adjustDifficulty(prevBlock, timestamp);
      hash = generateHash(timestamp, prevHash, data, nonce, difficulty);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
    );
    return new this(
      timestamp,
      prevHash,
      generateHash(timestamp, prevHash, data),
      nonce,
      difficulty,
      data
    );
  }
  static adjustDifficulty(originalBlock: Block, timestamp: Date) {
    const difficulty = originalBlock.difficulty;
    if (difficulty < 1) return 1;
    const difference = timestamp.getTime() - originalBlock.timestamp.getTime();
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}
// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const block2 = new Block(new Date(), '0x323', '0x324', 'Hello');
// const mineBlock = Block.mineBlock(genesisBlock, block2);

// console.log(mineBlock)
