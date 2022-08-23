import { sticker } from ('../lib/sticker')
import { MessageType } from ('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
  await m.reply('......')
  try {
    let stonk = global.API('https://hardianto.xyz', '/api/stonk', {
    image: await conn.getProfilePicture(m.sender).catch(_ => 'https://i.ibb.co/DRfj2J9/avatar-contact.jpg'),
    apikey: 'hardianto'})
    let stiker = await sticker(null, stonk, 'Stonk', global.author)
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
  } catch (e) {
  m.reply('Conversion Failed')
  }
}
handler.help = ['stonk']
handler.tags = ['sticker']
handler.command = /^stonk$/i

module.exports = handler
