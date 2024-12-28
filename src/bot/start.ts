import { Telegraf } from "telegraf";
import getTimes from "./utils/getTimes";
import currentMin from "./utils/currentMin";
console.log(currentMin());

const startBot = function (bot: Telegraf) {
	bot.start(async (ctx) => {
		ctx.reply("You're slacking again.. Lock tf in.");
		ctx.reply("Hello");
		const times = getTimes();
		console.log(times + "d");
	});
};

export default startBot;
