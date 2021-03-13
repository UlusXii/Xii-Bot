const db = require("quick.db") 
const Discord = require("discord.js");
const ms = require('parse-ms')
exports.run = async (client, message, args) => {

    
 const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
 let user = message.author;
 let author = await db.fetch(`${user.id}.maden`)
 let meslek = db.fetch(`${user.id}.meslek`)
 let timeout = 600000;
 let maden = await db.fetch(`${user.id}.maden`);
 let sonmaden = await db.fetch(`${user.id}.lastmaden`)
 if(meslek != "Madenci" ) return message.channel.send(`${user}, bu komutu kullanabilmen için **Madenci ⛏** olman gerekiyor.`)
 if (maden !== null && timeout - (Date.now() - maden) > 0) {
   let time = ms(timeout - (Date.now() - maden));
 
   let timeEmbed = new Discord.RichEmbed()
   .setTitle("Eyvah burada bir şeyler ters gidiyor!")
   .setColor("#FFFFFF")
   .setDescription(`**Zaten bir maden kazmışsın..** \n **Son çıkarılan maden : ${sonmaden}  \n __${time.hours}s ${time.minutes}d ${time.seconds}s sonra tekrar dene.__ `)
   
   message.channel.send(timeEmbed)
 }
  else {

    let madenler = [
    "⚪ `(Demir)`",
    "🟡 `(Altın)`",
    "🟢 `(Zümrüt)`",
    "💎 `(Elmas)`"

    ]
    let madenresult = Math.floor((Math.random() * madenler.length));
    let amount = Math.floor(Math.random() * 800) + 1;
        if (!args[0]) {
          message.channel.sendEmbed(new Discord.RichEmbed()
          .setTitle(`${message.author.tag} kazmasını eline aldı ⛏`)
          .addField(`Kazılan maden :`,`${madenler[madenresult]}`)
          .addField(`Çıkarılan madenleri sattın ve `,`\`${amount}\` lira kazandın.`)
          .setColor("#F9C34F"))
    db.add(`${user.id}.money`, amount)
    db.set(`${user.id}.lastmaden`, madenler[madenresult])
    db.set(`${user.id}.maden`, Date.now())
    }
   }
  
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['maden','mn']
    
  };
  
  exports.help = {
    name: 'Maden çıkarma',
    description: 'Maden çıkarma komutu',
    usage: 'maden & mn'
  };