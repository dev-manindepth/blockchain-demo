import crypto from 'crypto';
import hexToBinary from 'hex-to-binary';

export const generateHash = (...args: any[]) => {
  const hash = crypto.createHash('sha256');
  hash.update(args.join(''));
  return hexToBinary(hash.digest('hex'));
};
