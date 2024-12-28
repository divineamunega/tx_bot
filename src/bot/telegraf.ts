import { configDotenv } from "dotenv";
import { Telegraf } from "telegraf";
import startBot from "./start";
configDotenv({ path: "./.env" });

const TelegrafBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

startBot(TelegrafBot);

export default TelegrafBot;
