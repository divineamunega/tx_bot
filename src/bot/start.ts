import { Telegraf, Markup } from "telegraf";

const startBot = function (bot: Telegraf) {
	bot.start((ctx) => {
		// const telegramId = ctx.chat.id;
		ctx.reply(
			"Click below to connect your X account:",
			Markup.inlineKeyboard([
				Markup.button.url("Connect X", "http://localhost/auth/x"),
			])
		);
	});
};

export default startBot;
