const check = require(`${__dirname}/../../tools/check`);
const send = require(`${__dirname}/../../tools/send`);

module.exports = {
	name: "donator",
	developerOnly: true,
	execute: async function(message, args, prefix, client, [firebase, data]) {

		let user = message.mentions.users.first();
		if (user) {

			await check(firebase, user.id);
			let Data = await firebase.doc(`/users/${user.id}`).get();
			let userData = Data.data();
			userData.donator = args[0];

			let multi = userData.currencies.multiplier;
			multi += 1.5;
			userData.currencies.multiplier = multi;

			await firebase.doc(`/users/${user.id}`).set(userData);
			send.sendChannel({ channel: message.channel, author: message.author }, { content: `You gave <@${user.id}> the badge!` });

			const channel = client.channels.cache.get("832245299409846307");
			send.sendChannel({ channel: channel, author: message.author }, { content: `${message.author.tag} with ID ${message.author.id} gave ${user.tag} the donator ${args[0]} tier!` });

		}
		else {

			let userData = data.data();
			userData.donator = args[0];

			let multi = userData.currencies.multiplier;
			multi += 1.5;
			userData.currencies.multiplier = multi;

			await firebase.doc(`/users/${message.author.id}`).set(userData);
			send.sendChannel({ channel: message.channel, author: message.author }, { content: `You gave <@${message.author.id}> the badge!` });

			const channel = client.channels.cache.get("832245299409846307");
			send.sendChannel({ channel: channel, author: message.author }, { content: `${message.author.tag} with ID ${message.author.id} gave themselves the donator ${args[0]} tier!` });

		}
	}
};