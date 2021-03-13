const Discord = require('discord.js')
const db = require('quick.db');
const message = require('../events/message');
exports.run = async (client, message, args) => {
    let user = message.author
    let timeout = 86400000
    let mesleksorgu = db.fetch(`${user.id}.meslek`)
    if(mesleksorgu != null){
        message.channel.send(`Mesleğinizden ayrıldınız. \n Eski mesleğiniz: ${mesleksorgu} `)
        db.set(`${user.id}.meslek`, null)
    }
    else{
        message.channel.send(`${user}, şuanda zaten **İşsiz**sin.`)
    }

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['al','ayrıl']
    
  };
  exports.help = {
    name: 'Meslek Ayrıl',
    description: 'Varolan mesleğinizden ayrılma komutu',
    usage: 'xii.ayrıl && xii.meslekayrıl'
  };