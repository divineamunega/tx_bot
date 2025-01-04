import { sendMessage } from "../apiTelegram";
import getQuote from "../getRandomQuote";
import delay from "../utils/delay";
import formatTimeFromMinute from "../utils/formatTimeFromMinute";
import randomPhrase from "../utils/randomPhrases";

const sentForMinute: any = {};
const lockInReminder = async function (
	currentMinute: number,
	times: number[],
	todayKey: string,
	allUsers: any,
	nextMessageTime: number
) {
	for (let i = 0; i < times.length; i++) {
		if (currentMinute > times[i]) continue;

		if (
			currentMinute === times[i] &&
			!sentForMinute[`${todayKey}:${currentMinute}`]
		) {
			const { q, a } = await getQuote();
			const message = `${randomPhrase()}\n\n${q} \n\n <b>${a}</b>`;

			for (let j = 0; j < allUsers.length; j++) {
				const id = allUsers[j].key.split(":")[0];

				const tasks = [5000, 0, 0];

				// Asyncronously send the messages so I don't block the thread for other users
				(async () => {
					for (const [index, delayTime] of tasks.entries()) {
						if (index === 0) {
							await sendMessage(message, id);
						}
						if (index === 1) {
							sendMessage(
								`I will remind you to lock in again by ${formatTimeFromMinute(
									nextMessageTime!
								)} \n <b>So you dont slack off again 💀 🫵</b>`,
								id,
								"HTML"
							);
						}

						if (index === 2) {
							sentForMinute[`${todayKey}:${currentMinute}`] = true;
						}

						await delay(delayTime);
					}
				})();
			}
		}
	}
};

export default lockInReminder;

// Code to look at later

// for (const user of allUsers) {
//     const id = user.key.split(":")[0];

//     const tasks = [
//       {
//         action: async () => {
//           await sendMessage(message, id); // First task
//         },
//         delay: 5000, // Wait for 5 seconds after this
//       },
//       {
//         action: async () => {
//           await sendMessage(
//             `I will remind you to lock in again by ${formatTimeFromMinute(
//               nextMessageTime!
//             )} \n <b>So you dont slack off again 💀 🫵</b>`,
//             id,
//             "HTML"
//           ); // Second task
//         },
//         delay: 0, // No delay after this
//       },
//       {
//         action: async () => {
//           sentForMinute[`${todayKey}:${currentMinute}`] = true; // Third task
//         },
//         delay: 0, // No delay after this
//       },
//     ];

//     // Run each user's tasks asynchronously
//     (async () => {
//       for (const task of tasks) {
//         try {
//           await task.action(); // Run the action
//           if (task.delay) await delay(task.delay); // Wait for the specified delay
//         } catch (err) {
//           console.error(`Error executing task for user ${id}:`, err.message);
//         }
//       }
//     })();
//   }
