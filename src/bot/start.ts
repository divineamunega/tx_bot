import { Telegraf, Markup } from "telegraf";
const X_URL = "https://6fb6-102-89-22-218.ngrok-free.app/";

const startBot = function (bot: Telegraf) {
	bot.start((ctx) => {
		const telegramId = ctx.chat.id;

		// Save this in the database as user_telegram_start_code

		// Maybe I can hash it
		ctx.reply(
			"Click below to connect your X account:",
			Markup.inlineKeyboard([
				Markup.button.url("Connect X", `${X_URL}auth/x?${telegramId}`),
			])
		);
	});
};

export default startBot;
