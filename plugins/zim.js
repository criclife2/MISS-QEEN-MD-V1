// wahai para para weaboo🗿
let fetch from ('node-fetch')
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, global.API('adiisus', '/api/randomimage/milf'), 'milf.jpg', '_*💆‍♂️𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙_𝚋𝚘𝚝 #24/7💆‍♂️*_', m)
}
handler.help = ['milf']
handler.tags = ['internet']
handler.command = /^(milf)$/i
handler.limit = true
module.exports = handler
