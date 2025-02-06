import { createClient } from "redis";
import dotenv from "dotenv";
import { config } from "../../shared/config";

dotenv.config();

const client = createClient({
  url: config.redis.URI,
});

client.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  await client.connect();
  console.log("✅ Redis connected successfully!");
})();

export default client;
