import "dotenv/config";
import { env } from "./env";

export default {
  datasource: {
    url: env.DB_Url,
  },
};
