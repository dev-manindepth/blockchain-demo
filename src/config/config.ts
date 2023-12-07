import { generateHash } from '../utils/HashGenerator';

export const MINE_RATE=1000;
const INITIAL_DIFFICULTY = 2;
export const GENESIS_DATA = {
  timestamp: new Date(),
  prevHash: generateHash('98f'),
  hash: generateHash('fsd'),
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
  data: [],
};
