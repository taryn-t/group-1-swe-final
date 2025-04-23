// utils/encryption.ts
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex'); // 32 bytes key
const iv = crypto.randomBytes(16);

export async function encrypt(text: string): Promise<string> {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export async function decrypt(data: string): Promise<string> {
  const [ivHex, encryptedHex] = data.split(':');
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, 'hex')
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, 'hex')),
    decipher.final()
  ]);
  return decrypted.toString();
}