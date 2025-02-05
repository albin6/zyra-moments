export interface IRedisTokenRepository {
  blackListToken(token: string, expiresIn: number): Promise<void>;
  isTokenBlackListed(token: string): Promise<boolean>;
}
