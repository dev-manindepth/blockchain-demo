import express, { Request, Response } from 'express';
import { PubSub } from './pubsub';
import { Blockchain } from './Blockchain';

const app = express();

app.use(express.json());

const blockchain = new Blockchain();
const pubSub = new PubSub(blockchain);

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

app.get('/api/v1/blocks', (req: Request, res: Response) => {
  res.json(blockchain.chain);
});

app.post('api/v1/mine', (req: Request, res: Response) => {
  const { data } = req.body;
  blockchain.addBlock(data);
  pubSub.broadchastChain();
  res.redirect('/api/v1/blocks');
});

const synChains = async () => {
  try {
    const response = await fetch(`${ROOT_NODE_ADDRESS}/api/blocks`);

    if (response.ok) {
      const rootChain = await response.json();
      console.log('Replace chain on sync with', rootChain);
      blockchain.replaceChain(rootChain);
    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
    }
  }
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`listening to PORT : ${PORT}`);
  synChains();
});
