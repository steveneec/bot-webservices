import * as bcrypt from 'bcrypt';

export class EncryptHelper {
  static async encryptString(value: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(value, saltOrRounds);
  }

  static async compareString(value: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(value, hash);
    return isMatch;
  }
}
