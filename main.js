/*
 * Copyright (c) 2018 Aditya Saligrama and contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
 * EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

// UserInfoBot for RCR Discord
// Now working with Discord.JS v12!

// Load up the discord.js library (added intents to satisfy Discord gateway v8)
const { Client , Intents } = require('discord.js');
const myIntents = new Intents();
myIntents.add('GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS');

// Instantiate client with intents
const client = new Client({ partials: ["REACTION", "MESSAGE"], ws: { intents: myIntents } });

// Here we load the config.json file that contains our token
const auth = require("./auth.json");
// config.token contains the bot's token

// modify this for your own server
const botLoggingChannel = "audit";

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", message => {
  // Test command (create output without requiring a user join/leave)
  if (message.content == "infobot foobar") {
    sendMessage("**User <@" + message.member.user.id + "> info:**\n**ID:** " + message.member.id + "\n**Avatar URL:** " + message.member.user.displayAvatarURL() + "\n**Is a bot?** " + message.member.user.bot + "\n**Account Created At**: " + message.member.user.createdAt, botLoggingChannel);
  }
}); 

client.on('guildMemberAdd', member => {
  //when someone joins this event is called, the variable member is of type GuildMember in Discord.JS
  sendMessage("**User <@" + message.member.user.id + "> has joined.**\n**ID:** " + message.member.id + "\n**Avatar URL:** " + message.member.user.displayAvatarURL() + "\n**Is a bot?** " + message.member.user.bot + "\n**Account Created At**: " + message.member.user.createdAt, botLoggingChannel);
});

client.login(auth.token);

//the send message function
function sendMessage(msg, channelName) {
    client.channels.cache.find(i => i.name === channelName).send(msg)
      .then(message => console.log(`Sent message: ${message.content}`)).catch(console.error);
}
