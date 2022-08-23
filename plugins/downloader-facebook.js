import { facebookdl, facebookdlv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://fb.watch/azFEBmFRcy/`
    const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
    for (const { url, isVideo } of result.reverse()) conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `⫺╤╤╧ *𝘔𝘪𝘴𝘴 𝘘𝘦𝘦𝘯 𝘞𝘈 𝘣𝘰𝘵* ╧╤╤⫹\n  ‍   ‍  ‍  ‍ ‍  ‍   ‍  ‍  ‍  \n🔗 *Url:* ${url}`, m)
}
handler.help = ['facebbok'].map(v => v + '')
handler.tags = ['downloader']

handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler
