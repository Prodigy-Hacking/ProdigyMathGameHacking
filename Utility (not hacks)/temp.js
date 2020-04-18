const Discord = require("discord.js");
const { MessageEmbed } = Discord;

const client = new Discord.Client();

let lastMessageContent = "";

client.on("ready", () => {
	console.log("I am ready!");
	client.user.setActivity("1 server", { type: "WATCHING" });
});
const addReactions = async message => {
	for (const reaction of ["690302006501572658", "690301793217020075", "690301996292767764"]) await message.react(reaction)
};
client.on("message", async message => {
	if (message.channel.id === "685965137361895476") await addReactions(message)
	if (
		message.channel.id === "685965137361895476" &&
		!(message.content === lastMessageContent) &&
		!message.author.bot &&
		!(message.author.id === "413143886702313472")
	) {
		const embed = new MessageEmbed()
			.setTitle("Announcement")
			.setColor(0xff0000)
			.setDescription(message.content)
			.setFooter(`Timestamp: ${Date(message.timestamp)}`)
			.setAuthor(message.author.tag, message.author.displayAvatarURL());

		await message.channel.send(embed);

		lastMessageContent = message.content; //remember this to stop the bot from spam-repeating itself

		await message.delete();
	}

	if (
		message.guild &&
		!message.author.bot &&
		message.content.startsWith("!announce ") &&
		!(message.content == lastMessageContent)
	) {
		const announceChannel = message.guild.channels.cache.find(ch => ch.name === "announcements");

		const embed = new MessageEmbed()
			.setTitle("Announcement")
			.setColor(Math.floor(Math.random() * 2 ** 24))
			.setDescription(message.content.replace(/\!announce\s+/, ""))
			.setTimestamp()
			.setAuthor(message.author.tag, message.author.displayAvatarURL());

		await announceChannel.send(embed);

		lastMessageContent = message.content; //remember this to stop the bot from spam-repeating itself
	}
});
