import { Block } from './Block';
import { generateHash } from './utils/HashGenerator';

export class Blockchain {
  chain: Block[];
  constructor() {
    // Initilizase chain with genesis block(remember genesis block is the first block of chain)
    this.chain = [Block.genesis()];
  }
  addBlock(data: any) {
    const newBlock = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(newBlock);
  }
  replaceChain(chain: Block[]) {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain is not longer');
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain is not valid');
      return;
    }
    this.chain = chain;
  }
  static isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, data } = chain[i];
      const prevBlockHash = chain[i - 1].hash;
      if (prevHash !== prevBlockHash) return false;

      const validatedHash = generateHash(timestamp, prevHash, data);
      if (hash !== validatedHash) return false;
    }
    return true;
  }
}
const blockchain = new Blockchain();
blockchain.addBlock('rwe');
blockchain.addBlock('sdf');
console.log(blockchain);
const isValidChain = Blockchain.isValidChain(blockchain.chain);
console.log('Is blockchain valid', isValidChain);
