// wahai para para weabooð¿
let fetch from ('node-fetch')
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, global.API('adiisus', '/api/randomimage/milf'), 'milf.jpg', '_*ðââï¸ðððððððð_ððð #24/7ðââï¸*_', m)
}
handler.help = ['milf']
handler.tags = ['internet']
handler.command = /^(milf)$/i
handler.limit = true
module.exports = handler
