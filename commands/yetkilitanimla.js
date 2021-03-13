const db = require('quick.db');
const Discord = require('discord.js');
const message = require('../events/message');
const ayarlar = require('../ayarlar.json');


exports.run = async (client, message, args) => {
    let user = message.author
    let owner = ayarlar.author;
    let hedefkullanici = message.mentions.members.first()
    if(user.id != ayarlar.author) return message.reply("Bu kodu sadece sahibim kullanabilir")
    if(!hedefkullanici) return message.channel.send(`${user}, yetkili yapmak istediğiniz kişiyi etiketleyin.`)
    db.set(`${hedefkullanici.id}.yetki`,1)
    message.channel.send(`${user}, ${hedefkullanici} adındaki kullanıcıyı yetkili yaptı 🎉`)


}

exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['yetkili','yetki']
        
};
      
exports.help = {
        name: 'Yetkili atama',
        description: 'Bot yetkilisi verme komutu.',
        usage: 'Yetkili & yetki'
};