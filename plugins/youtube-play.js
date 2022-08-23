import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Not found'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
 ⫺╤╤╧ *𝘔𝘪𝘴𝘴 𝘘𝘦𝘦𝘯 𝘞𝘈 𝘣𝘰𝘵* ╧╤╤⫹

🎭➠ *Title:* ${title}

🎭➠ *Url:* ${url}

🎭➠ *Description:* ${description}

🎭➠ *Published:* ${publishedTime}

🎭➠ *Duration:* ${durationH}

🎭➠ *Views:* ${viewH}

⫺ ╧╧╧╧╧╧ ⋞ 〈⫹⫺〉 ⋟ ╧╧╧╧╧╧ ⫹
  `.trim(), author, thumbnail, '', '', null, null, [
    ['⦀𝙰𝚄𝙳𝙸𝙾➟𝚃𝚈𝙿𝙴➟𝙳𝙾𝙲𝚄𝙼𝙴𝙽𝚃⦀', `${usedPrefix}yta ${url} yes`],
    ['⦀𝚅𝙸𝙳𝙴𝙾➠𝚀𝚄𝙰𝙻𝙸𝚃𝚈➟360𝙿⦀', `${usedPrefix}ytv ${url} yes`]
  ], m, { asLocation: 1 })
}
handler.help = ['song', 'video','play'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^(song|video|play)$/i

handler.exp = 0
handler.limit = false

export default handler

