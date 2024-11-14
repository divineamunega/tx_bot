import { Telegraf, Markup } from "telegraf";

const startBot = function (bot: Telegraf) {
	bot.start((ctx) => {
		const authorizationUrl =
			"https://twitter.com/i/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&response_type=code&scope=YOUR_SCOPES";

		ctx.reply(
			"Click below to connect your X account:", // Optional introductory message
			Markup.inlineKeyboard([Markup.button.url("Connect X", authorizationUrl)])
		);
	});
};

export default startBot;
