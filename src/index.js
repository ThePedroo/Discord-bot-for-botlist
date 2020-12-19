const Discord = require('discord.js')
const client = new Discord.Client()

client.on('message', async (message) => {
 if(message.mentions.users.first() && message.mentions.users.first().id == client,user.id) {
   message.channel.send(`Ola ${message.author}`)
   }
  })

client.login(require('./config.json').TOKEN)
