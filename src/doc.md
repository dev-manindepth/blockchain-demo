# Understanding Blockchain

Blockchain is a decentralized and distributed ledger technology that securely records data across a network of computers. It consists of a chain of blocks, where each block contains a list of transactions and a reference to the previous block. The integrity of the entire chain is maintained through cryptographic hashes.

## How Blockchain Works

1. **Blocks**: Each block contains a set of transactions, a timestamp, and a reference to the previous block.

   ![Block Structure](path/to/block-structure.png)

2. **Hashing**: Blocks are linked together using cryptographic hash functions. The hash of each block is calculated based on its content and the previous block's hash.

   ![Hashing](path/to/hashing.png)

3. **Decentralization**: The blockchain is stored on a network of computers (nodes), making it decentralized. This ensures that no single entity has control over the entire blockchain.

   ![Decentralization](path/to/decentralization.png)

4. **Consensus**: Consensus mechanisms, such as proof-of-work or proof-of-stake, are used to agree on the state of the blockchain. These mechanisms prevent malicious actors from tampering with the data.

   ![Consensus](path/to/consensus.png)

## Code Implementation

Below is a simplified TypeScript code for creating a basic blockchain:

```typescript
// Include the TypeScript code here
// ...

// Example usage
const myCoin = new Blockchain();

myCoin.createTransaction({ from: 'Alice', to: 'Bob', amount: 50 });
myCoin.createTransaction({ from: 'Bob', to: 'Charlie', amount: 30 });

console.log('\nMining in progress...');
myCoin.minePendingTransactions('MinerAddress');

console.log('\nBalance of Miner:', myCoin.getBalanceOfAddress('MinerAddress'));

console.log('\nMining in progress...');
myCoin.minePendingTransactions('MinerAddress');

console.log('\nBalance of Miner:', myCoin.getBalanceOfAddress('MinerAddress'));
