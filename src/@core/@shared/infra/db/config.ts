import { config as readEnv } from 'dotenv';
import { join } from 'path';

export class Config {
  static env: any = null;

  static db() {
    Config.readEnv();

    return {
      dialect: Config.env.DB_DIALECT,
      host: Config.env.DB_HOST,
      logging: Config.env.DB_LOGGING === 'true',
      username: Config.env.DB_USERNAME,
      password: Config.env.DB_PASSWORD,
      database: Config.env.DB_DATABASE,
      port: Config.env.DB_PORT,
    };
  }

  static readEnv() {
    if (Config.env) {
      return;
    }

    Config.env = readEnv({
      path: join(__dirname, `../../../../../envs/.env.${process.env.NODE_ENV}`),
    }).parsed;
  }
}
