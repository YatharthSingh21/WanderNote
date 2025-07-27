import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

console.log("🔧 Redis URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("🔧 Redis Token:", process.env.UPSTASH_REDIS_REST_TOKEN?.slice(0, 10), "...");

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
});

export default ratelimit;