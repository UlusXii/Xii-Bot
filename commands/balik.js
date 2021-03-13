const db = require("quick.db") 
const Discord = require("discord.js");
const ms = require('parse-ms')
exports.run = async (client, message, args) => {

    
 const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
 let user = message.author;
 let author = await db.fetch(`${user.id}.fish`)
 let meslek = db.fetch(`${user.id}.meslek`)
 let timeout = 300000;
 let balik = await db.fetch(`${user.id}.fish`);
 let sonbalik = await db.fetch(`${user.id}.lastfish`)
 if(meslek != "Balıkçı" ) return message.channel.send(`${user}, bu komutu kullanabilmen için **Balıkçı 🎣** olman gerekiyor.`)
 if (balik !== null && timeout - (Date.now() - balik) > 0) {
   let time = ms(timeout - (Date.now() - balik));
 
   let timeEmbed = new Discord.RichEmbed()
   .setColor("#FFFFFF")
   .setDescription(`**Zaten bir balık tutmuşsun.** \n __Son Tuttuğun__ : ${sonbalik} \n ${time.hours}s ${time.minutes}d ${time.seconds}s sonra tekrar dene. `);

   message.channel.send(timeEmbed)
 }
  else {

    let fish = [
    "🐠 `(Tropikal balık)`",
    "🐟 `(Balık)`",
    "🐡 `(Balon Balığı)`",
    "🐬 `(Yunus)`",
    "🦐 `(Karides)`",
    "🦈 `(Köpek Balığı)`",
    "🔋 `(Pil)`",
    "🦂 `(Yengeç)`",
    "👕 `(T-Shirt)`",
    "📦 `(Poşet)`"

    ]
    let fishresult = Math.floor((Math.random() * fish.length));
    let amount = Math.floor(Math.random() * 100) + 1;
        if (!args[0]) {
        message.channel.sendEmbed(new Discord.RichEmbed()
        .setTitle(`${message.author.tag} oltasını salladı 🎣`)
        .addField(`Oltaya takılan balık :`,`${fish[fishresult]}`)
        .addField(`Taze balıkları oltasından aldı ve balıkçıya sattı `,`\`${amount}\` lira kazandın.`)
        .setColor("#2992C3"))
    db.add(`${user.id}.money`, amount)
    db.set(`${user.id}.lastfish`, fish[fishresult])
    db.set(`${user.id}.fish`, Date.now())
    }
   }
  
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['balik','b']
    
  };
  
  exports.help = {
    name: 'Balik tutma',
    description: 'Balık tutma komutu',
    usage: 'b & balik'
  };