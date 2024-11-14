import { configDotenv } from "dotenv";
import { Telegraf } from "telegraf";
import setCommands from "./bot/commands";
import startBot from "./bot/start";
configDotenv({ path: "./.env" });

const TelegrafBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

startBot(TelegrafBot);
setCommands(TelegrafBot);

export default TelegrafBot;
