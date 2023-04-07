const Discord = require("discord.js")
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: "32767" });

const keepAlive = require('./server.js');
const express = require("express")().get("/", (req,res)=>res.send("Bot en Linea!")).listen(3000)
const fs = require('fs');
const { Collection } = require('discord.js');

let { readdirSync } = require('fs') 

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}

client.on('messageCreate', (message) => {

  let prefix = '!'
  
  if(message.author.bot) return;

if(!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.member;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if(cmd){
    cmd.execute(client, message, args)
  }

})


const mySecret = process.env['TOKEN']
client.login(mySecret);
