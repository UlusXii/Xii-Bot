const db = require("quick.db") 
const Discord = require("discord.js");
const ms = require('parse-ms')
exports.run = async (client, message, args) => {

    
 const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
 let user = message.author;
 let author = await db.fetch(`${user.id}.odun`)
 let meslek = db.fetch(`${user.id}.meslek`)
 let timeout = 300000;
 let odun = await db.fetch(`${user.id}.odun`);
 let sonodun = await db.fetch(`${user.id}.lastodun`)
 
 if(meslek != "Oduncu" ) return message.channel.send(`${user}, bu komutu kullanabilmen için **Oduncu 🪓** olman gerekiyor.`)
 if (odun !== null && timeout - (Date.now() - odun) > 0) {
   let time = ms(timeout - (Date.now() - odun));
 
   let timeEmbed = new Discord.RichEmbed()
   .setTitle("Eyvah burada bir şeyler ters gidiyor!")
   .setColor("#FFFFFF")
   .setDescription(`**Zaten bir ağaç kesmişsin..** \n **Son Kestiğin ağaç : ${sonodun}  \n __${time.hours}s ${time.minutes}d ${time.seconds}s sonra tekrar dene.__ `)
   
   message.channel.send(timeEmbed)
 }
  else {

    let odunlar = [
    "🎄 `(Yılbaşı ağacı)`",
    "🌴 `(Palmiye ağacı)`",
    "🌲 `(Meşe ağacı)`",
    "🌳 `(Çalı)`",
    "🎋 `(Bambu)`"

    ]
    let odunresult = Math.floor((Math.random() * odunlar.length));
    let amount = Math.floor(Math.random() * 500) + 1;
        if (!args[0]) {
          message.channel.sendEmbed(new Discord.RichEmbed()
          .setTitle(`${message.author.tag} baltasını eline aldı 🪓`)
          .addField(`Kestiğin ağaç:`,`${odunlar[odunresult]}`)
          .addField(`Odunları sattın ve `,`\`${amount}\` lira kazandın.`)
          .setColor("#F9C34F"))
    db.add(`${user.id}.money`, amount)
    db.set(`${user.id}.lastodun`, odunlar[odunresult])
    db.set(`${user.id}.odun`, Date.now())
    }
   }
  
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['odun','o']
    
  };
  
  exports.help = {
    name: 'Ağaç kesme',
    description: 'Ağaç kesme komutu',
    usage: 'o & odun'
  };