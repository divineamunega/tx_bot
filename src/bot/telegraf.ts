import { configDotenv } from "dotenv";
import { Telegraf } from "telegraf";
import setCommands from "./commands";
import startBot from "./start";
configDotenv({ path: "./.env" });

const TelegrafBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

startBot(TelegrafBot);
setCommands(TelegrafBot);

export default TelegrafBot;
