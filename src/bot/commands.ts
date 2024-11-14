import { Telegraf } from "telegraf";

const setCommands = (bot: Telegraf) => {
	bot.command("connectx", (ctx) => {
		ctx.reply("Hello");
	});
};

export default setCommands;
