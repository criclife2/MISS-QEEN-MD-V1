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
โซบโคโคโง *๐๐ช๐ด๐ด ๐๐ฆ๐ฆ๐ฏ ๐๐ ๐ฃ๐ฐ๐ต* โงโคโคโซน

*๐ญโ  ๐ง๐๐ง๐๐:* ${title}

*๐ญโ  ๐๐๐๐๐ฆ๐๐ญ๐ :* ${audio['128kbps'].fileSizeH}
*${isLimit ? 'Use ' : ''}Link:* ${link}
`.trim(), m)
if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp3', `

*๐ญโ  ๐ง๐๐ง๐๐:* ${title}

*๐ญโ  ๐๐๐๐๐ฆ๐๐ญ๐:* ${audio['128kbps'].fileSizeH}

โซบ โงโงโงโงโงโง โ โฉโซนโซบโช โ โงโงโงโงโงโง โซน
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

