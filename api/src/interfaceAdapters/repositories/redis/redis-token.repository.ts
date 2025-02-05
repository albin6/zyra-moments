import { injectable } from "tsyringe";
import { IRedisTokenRepository } from "../../../entities/repositoryInterfaces/redis/redis-token-repository.interface";
import client from "../../../frameworks/cache/redis.client";

@injectable()
export class RedisTokenRepository implements IRedisTokenRepository {
  async blackListToken(token: string, expiresIn: number): Promise<void> {
    await client.set(token, "blacklisted", { EX: expiresIn });
  }

  async isTokenBlackListed(token: string): Promise<boolean> {
    const result = await client.get(token);
    return result === "blacklisted";
  }
}
