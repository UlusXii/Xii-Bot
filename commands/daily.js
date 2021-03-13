const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  let xp = db.fetch(`${user.id}.xp`)
  let user_level = db.fetch(`${user.id}.level`)
  let timeout = 86400000;
  let amount = Math.floor((Math.random() * 10 + 30));
  let daily = await db.fetch(`${user.id}.daily`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Günlük ödülünü almış gözüküyorsun. ${time.hours}s ${time.minutes}d ${time.seconds}s sonra tekrar dene. `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Günlük ödülünü aldın! Ödül tutarı : ${amount} lira`);
  message.channel.send(moneyEmbed)
  db.set(`${user.id}.daily`, Date.now())
  db.add(`${user.id}.money`, amount)

  }
};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['gunluk','daily']
    
  };
  
  exports.help = {
    name: 'Günlük ',
    description: 'Günlük komutu.',
    usage: 'Günlük'
  };