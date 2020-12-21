const Discord = require('discord.js')
const client = new Discord.Client()
comst config = require('./config.json')

client.on('message', async (message) => {
 if(message.mentions.users.first() && message.mentions.users.first().id == client,user.id) {
   message.channel.send(`Olá ${message.author}, meu Prefix é ${config,PREFIX}`)
   }
  })

client.login(require('./config.json').TOKEN)
