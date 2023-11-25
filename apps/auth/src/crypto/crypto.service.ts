import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  public generateRefreshToken() {
    return randomBytes(16).toString('base64url');
  }

  public generateCode() {
    return randomBytes(32).toString('base64url');
  }

  /**
   * OIDC code verification
   * @param code_verifier
   * @param code_challenge
   */
  public verifyCodeChallenge(code_verifier: string, code_challenge: string) {
    return createHash('sha256')
      .update(code_verifier)
      .digest()
      .equals(Buffer.from(code_challenge, 'base64url'));
  }
}
