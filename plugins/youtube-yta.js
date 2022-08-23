let limit = 80
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
    if (!args || !args[0]) throw 'Wheres the url?'
let { thumbnail, audio, title } = await youtubedl(args[0])
    .catch(async () => await youtubedlv2(args[0]))
let link = await audio['128kbps'].download()
const isY = /y(es)/gi.test(args[1])
const limitedSize = (isPrems || isOwner ? 99 : 70) * 1024
let isLimit = limitedSize < audio['128kbps'].fileSize
if (!isY) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
⫺╤╤╧ *𝘔𝘪𝘴𝘴 𝘘𝘦𝘦𝘯 𝘞𝘈 𝘣𝘰𝘵* ╧╤╤⫹

*🎭➠ 𝗧𝗜𝗧𝗟𝗘:* ${title}

*🎭➠ 𝗙𝗜𝗟𝗘𝗦𝗜𝗭𝗘 :* ${audio['128kbps'].fileSizeH}
*${isLimit ? 'Use ' : ''}Link:* ${link}
`.trim(), m)
if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp3', `

*🎭➠ 𝗧𝗜𝗧𝗟𝗘:* ${title}

*🎭➠ 𝗙𝗜𝗟𝗘𝗦𝗜𝗭𝗘:* ${audio['128kbps'].fileSizeH}

⫺ ╧╧╧╧╧╧ ⋞ 〈⫹⫺〉 ⋟ ╧╧╧╧╧╧ ⫹
`.trim(), m, null, {
asDocument: 1
})
}
handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <ur`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
handler.limit = 1

handler.exp = 0

export default handler

