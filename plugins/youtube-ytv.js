import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Wheres the link?'
  let { thumbnail, video, title } = await youtubedl(args[0])
      .catch(async () => await youtubedlv2(args[0]))
  let link = await video['360p'].download()
  const isY = /y(es)/gi.test(args[1])
  const limitedSize = (isPrems || isOwner ? 99 : 70) * 1024
  let isLimit = limitedSize < video['360p'].fileSize
  if (!isY) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
 โซบโคโคโง *๐๐ช๐ด๐ด ๐๐ฆ๐ฆ๐ฏ ๐๐ ๐ฃ๐ฐ๐ต* โงโคโคโซน

*๐ญโ  ๐ง๐๐ง๐๐:* ${title}

*๐ญโ  ๐๐๐๐๐ฆ๐๐ญ๐:* ${video['360p'].fileSizeH}
*${isLimit ? 'Uasge ' : ''}Link:* ${link}
`.trim(), m)
if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp3', `

*๐ญโ  ๐ง๐๐ง๐๐:* ${title}

*๐ญโ  ๐๐๐๐๐ฆ๐๐ญ๐:* ${video['360p'].fileSizeH}

โซบ โงโงโงโงโงโง โ โฉโซนโซบโช โ โงโงโงโงโงโง โซน
`.trim(), m, null, {
  asDocument: 0
})
}
handler.help = ['mp4', 'v'].map(v => 'yt' + v + ``)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
handler.limit = 1
handler.exp = 0


export default handler

