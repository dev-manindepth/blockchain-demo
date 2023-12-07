import crypto from 'crypto';

export const generateHash = (...args: any[]) => {
  const hash = crypto.createHash('sha256');
  hash.update(args.join(''));
  return hash.digest('hex');
};
