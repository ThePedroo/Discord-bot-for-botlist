const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
.commands = new Discord.Collection()
comst config = require('./config.json')

const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`)
	client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection()

client.on('ready', () => {
	console.log(`[ SISTEMA ] Conectado como ${client.user.tag}`)
});

client.on('message', message => {
 if(!message.author.bot && message.mentions.users.first() && message.mentions.users.first().id == client,user.id) {
   message.channel.send(`Olá ${message.author}, meu Prefix é ${config,PREFIX}`)
   }
 
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/)
	const commandName = args.shift().toLowerCase()

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	if(message.channel.type === 'dm') return;

	if(!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send({ 
    embed: {
     "description": `Espere mais ${timeLeft.toFixed(1)} segundo(s) para executar este comando!.`
		}
	})

	timestamps.set(message.author.id, now)
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	try {
		command.run(client, message, args)
	} catch (err) {
		console.log(`[ SISTEMA ] Um erro aconteceu no comando ${command.name}! ${err}`)
                message.channel.send({ embed: { "description": "Um erro aconteceu ao executar este comando..."} })
	}
});

client.login(require('./config.json').TOKEN)
