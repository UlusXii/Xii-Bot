const db = require("quick.db") 
const Discord = require("discord.js");
const ms = require('parse-ms')
exports.run = async (client, message, args) => {

    
 const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
 let user = message.author;
 let author = await db.fetch(`${user.id}.taksi`)
 let meslek = db.fetch(`${user.id}.meslek`)
 let timeout = 300000;
 let taksi = await db.fetch(`${user.id}.taksi`);
 let gidilenyol = args[0] 
 let songidilensehir = db.fetch(`${user.id}.sonsehir`)
 
 let sontaksi = await db.fetch(`${user.id}.lasttaksi`)
 if(meslek != "Taksici" ) return message.channel.send(`${user}, bu komutu kullanabilmen için **Taksici 🚕** olman gerekiyor.`)
 if (taksi !== null && timeout - (Date.now() - taksi) > 0) {
   let time = ms(timeout - (Date.now() - taksi));
 
   let timeEmbed = new Discord.RichEmbed()
   .setColor("#FFFFFF")
   .setDescription(`**Zaten bir yola çıkmışsın!** \n __Gidilen İstikamet__ : ${songidilensehir} \n ${time.hours}s ${time.minutes}d ${time.seconds}s sonra tekrar dene. `);

   message.channel.send(timeEmbed)
 }
 else if(!gidilenyol){
   message.channel.send(`Lütfen gitmek istediğiniz şehiri seçin: İstanbul & Ankara & İzmir`)
 }
 
 else if(gidilenyol){
   
   if(gidilenyol == "Ankara")
   {
    
    let loot = [
      "**🎀 `(Pavyondan bir kurdele)`",
      "**🥯 `(Simit)`",
      "**🚥 `(Led şerit)`",
      "**🐐 `(Keçi)`"
      ]
      let lootresult = Math.floor((Math.random() * loot.length));
      let amount = Math.floor(Math.random() * 200) + 1;
      message.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`${message.author.tag} taksiyi çalıştırdı.🟡`)
      .addField(`Yolda buldukların:`,`${loot[lootresult]}`)
      .addField(`Taksimetreden`,`\`${amount}\` lira kazandın.`)
      .setColor("#F9C34F")
)
      db.add(`${user.id}.money`, amount)
      db.set(`${user.id}.lasttaksi`, loot[lootresult])
      db.set(`${user.id}.taksi`, Date.now())
      db.set(`${user.id}.sonsehir`, gidilenyol)
  }
  if(gidilenyol == "İstanbul")
   {

    let loot = [
      "**🥪 `(Balık Ekmek)`",
      "**🧆 `(Sultan Ahmet Köftesi)`",
      "**🍺 `(Miltresiz Momonti)`",
      ]
      let lootresult = Math.floor((Math.random() * loot.length));
      let amount = Math.floor(Math.random() * 1000) + 1;
      message.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`${message.author.tag} taksiyi çalıştırdı.🟡`)
      .addField(`Yolda buldukların:`,`${loot[lootresult]}`)
      .addField(`Taksimetreden`,`\`${amount}\` lira kazandın.`)
      .setColor("#F9C34F")
)
      db.add(`${user.id}.money`, amount)
      db.set(`${user.id}.lasttaksi`, loot[lootresult])
      db.set(`${user.id}.taksi`, Date.now())
      db.set(`${user.id}.sonsehir`, gidilenyol)
   
  }
  if(gidilenyol == "İzmir")
   {

    let loot = [
      "**🥠 `(Boyoz)`",
      "**⛲ `(Çeşme)`",
      "**🍷 `(Köpek Öldüren)`",
      ]
      let lootresult = Math.floor((Math.random() * loot.length));
      let amount = Math.floor(Math.random() * 1000) + 1;
      message.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`${message.author.tag} taksiyi çalıştırdı.🟡`)
      .addField(`Yolda buldukların:`,`${loot[lootresult]}`)
      .addField(`Taksimetreden`,`\`${amount}\` lira kazandın.`)
      .setColor("#F9C34F")
)
      db.add(`${user.id}.money`, amount)
      db.set(`${user.id}.lasttaksi`, loot[lootresult])
      db.set(`${user.id}.taksi`, Date.now())
      db.set(`${user.id}.sonsehir`, gidilenyol)
   
  }
 }
  
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['taksi','t']
    
  };
  
  exports.help = {
    name: 'Taksi meslek komutu',
    description: 'Taksi meslek komutu',
    usage: 't & taksi*'
  };