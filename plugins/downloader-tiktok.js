import { tiktokdl, tiktokdlv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@oma/video/7025456384175017243`
    const { author: { nickname }, video, description } = await tiktokdl(args[0]).catch(async _ => await tiktokdlv2(args[0]))
    const url = video.no_watermark_raw || video.no_watermark || video.no_watermark_hd || video.with_watermark 
    if (!url) throw 'Can\'t download video!'
    conn.sendFile(m.chat, url, 'tiktok.mp4', `
โซบโคโคโง *๐๐ช๐ด๐ด ๐๐ฆ๐ฆ๐ฏ ๐๐ ๐ฃ๐ฐ๐ต* โงโคโคโซน\n
  โ   โ  โ  โ โ  โ   โ  โ  โ  \n
๐ *Url:* ${url}
๐ง *Nickname:* ${nickname}${description ? `๐น *Description:* ${description}` : ''}
`.trim(), m)
}
handler.help = ['tiktok'].map(v => v + '')
handler.tags = ['downloader']

handler.command = /^(tik(tok)?(dl)?)$/i

export default handler
