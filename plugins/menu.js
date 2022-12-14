import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
let tags = {
  'main': '๐ ๐๐๐ก',
  'game': '๐๐๐ ๐',
  'rpg': '๐ฅ๐ฃ๐ ๐๐๐ ๐๐ฆ',
  'xp': '๐ซ๐ฃ & ๐๐๐ ๐๐ง',
  'sticker': '๐ฆ๐ง๐๐๐๐๐ฅ',
  'kerang': '๐๐๐ฅ๐๐ก๐',
  'quotes': '๐ค๐ข๐จ๐ง๐๐ฆ',
  'group': '๐๐ฅ๐ข๐จ๐ฃ',
  'internet': '๐๐ก๐ง๐๐ฅ๐ก๐๐ง',
  'anonymous': '๐๐ก๐ข๐ก๐ฌ๐ ๐ข๐จ๐ฆ ๐๐๐๐ง',
  'nulis': '๐๐ข๐๐ข ๐ ๐๐๐๐ฅ',
  'anime': '๐๐ก๐๐ ๐',
  'nsfw': '๐ก๐ฆ๐',
  'downloader': '๐๐ข๐ช๐ก๐๐ข๐๐๐๐ฅ',
  'tools': '๐ง๐ข๐ข๐๐ฆ',
  'fun': '๐๐จ๐ก',
  'quran': '๐๐',
  'owner': '๐ข๐ช๐ก๐๐ฅ',
  'info': '๐๐ก๐๐ข',
}
const defaultMenu = {
  before: `
โโผโโโWฬออคฬอฬอฬฐEอคLฬฎฬอCฬฬฬฬอฬคฬบฬฎฬฬOMฬฎฬฅอฬฬฉEออฬออฬฎโโโโผโ

โญโโโโโฐ ๐จ๐ฆ๐๐ฅ โฑ
โโโ๐ฅ๐๐๐ ๐๐ง : *%limit Limit*
โโโ๐ฅ๐ฅ๐ข๐๐ : *%role*
โโโ๐ฅ๐๐๐ฉ๐๐ : *%level (%exp / %maxexp)*
โโโ๐ฅ๐ง๐ข๐ง๐๐ ๐ซ๐ฃ : %totalexp โจ
โโโ 
โโโ๐ฅ๐๐๐ง๐: *%date*
โโโ๐ฅ๐ง๐๐ ๐: *%time*
โโโ
โโโ๐ฅ๐จ๐ฃ๐ง๐๐ ๐: *%uptime (%muptime)*
โโโ๐ฅ๐๐๐ง๐๐๐๐ฆ๐: %rtotalreg of %totalreg
โโโผโโโโโโโโโโผโ๏ฝก

%readmore`.trimStart(),
  header: 'โญโโโโฐ %category โฑ',
  body: 'โ โแ %cmd %islimit %isPremium',
  footer: 'โโโผโโโโโโโโโโผโ๏ฝก\n',
  after: `
โซบโคโค ๐๐ช๐ด๐ด ๐๐ฆ๐ฆ๐ฏ ๐๐ ๐ฃ๐ฐ๐ต โคโคโซน
`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long', timeZone: 'Asia/Colombo' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Colombo'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Colombo'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => './src/avatar_contact.png')
    conn.sendHydrated(m.chat, text.trim(), author, pp, 'https://eu10b.serverse.com:1936/shaafm/shaafm/chunklist_w1943493657.m3u8', 'โฎโฎ๐ญ๐๐ท๐ฐ๐ฐ ๐ต๐ผ ๐ป๐ธ๐๐ด๐ญโฏโฏ', owner[0][0], 'โฎโฎ๐จโ๐ปOWNER๐จโ๐ปโฏโฏ', [
      ['โฎโฎ๐ฌBOTGROUP๐ฌโฏโฏ', '/donasi'],
      ['โฎโฎ๐ฅSPEED๐ฅโฏโฏ', '/ping'],
      ['โฎโฎ๐จโ๐ปOWNER๐จโ๐ปโฏโฏ', '/owner']
    ], m, { asLocation: 1 })
  } catch (e) {
    conn.reply(m.chat, 'My friend, menu  error', m)
    throw e
  }
}
handler.help = ['menu', 'help', 'alive']
handler.tags = ['main']
handler.command = /^(menu|m|help|\alive)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
