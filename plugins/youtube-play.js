import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Not found'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
 β«Ίβ€β€β§ *ππͺπ΄π΄ ππ¦π¦π― ππ π£π°π΅* β§β€β€β«Ή

π­β  *Title:* ${title}

π­β  *Url:* ${url}

π­β  *Description:* ${description}

π­β  *Published:* ${publishedTime}

π­β  *Duration:* ${durationH}

π­β  *Views:* ${viewH}

β«Ί β§β§β§β§β§β§ β β©β«Ήβ«Ίβͺ β β§β§β§β§β§β§ β«Ή
  `.trim(), author, thumbnail, '', '', null, null, [
    ['β¦π°ππ³πΈπΎβπππΏπ΄βπ³πΎπ²ππΌπ΄π½πβ¦', `${usedPrefix}yta ${url} yes`],
    ['β¦ππΈπ³π΄πΎβ πππ°π»πΈππβ360πΏβ¦', `${usedPrefix}ytv ${url} yes`]
  ], m, { asLocation: 1 })
}
handler.help = ['song', 'video','play'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^(song|video|play)$/i

handler.exp = 0
handler.limit = false

export default handler

