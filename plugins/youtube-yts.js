import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { text }) => {
  if (!text) throw 'What are you looking for?'
  const { video, channel } = await youtubeSearch(text)
  let teks = [...video, ...channel].map(v => {
    switch (v.type) {
      case 'video': return `
๐ญโ  *${v.title}* (${v.url})
      `.trim()
      case 'channel': return `
๐ญโ  *${v.channelName}* (${v.url})
๐ญโ  ${v.subscriberH} (${v.subscriber}) Subscriber
๐ญโ  ${v.videoCount} video
`.trim()
    }
  }).filter(v => v).join('\n\nโซบโคโคโง *๐๐ช๐ด๐ด ๐๐ฆ๐ฆ๐ฏ ๐๐ ๐ฃ๐ฐ๐ต* โงโคโคโซน\n\n')
  m.reply(teks)
}
handler.help = ['yts', 'getyt'].map(v => v + '')
handler.tags = ['tools']
handler.command = /^(yts|getyt)$/i

export default handler
