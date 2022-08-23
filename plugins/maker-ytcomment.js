let handler = async (m, { conn, text }) => {
    if (!text) throw 'No Text'
    conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/youtube-comment', {
      avatar: await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
      comment: text,
      username: conn.getName(m.sender)
    }), 'yt-comment.png', 'Here is your comment', m)
  }
  
  handler.help = ['ytcomment']
  handler.tags = ['maker']
  
  handler.command = /^(ytcomment)$/i
  
  export default handler