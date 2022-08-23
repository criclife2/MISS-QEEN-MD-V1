let handler =  m => m.reply(` *𝘔𝘪𝘴𝘴 𝘘𝘦𝘦𝘯 𝘞𝘈 𝘣𝘰𝘵*.❱
___________________________________________________
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donate']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
