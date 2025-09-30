// import fetch from "node-fetch";

// let longLivedToken = process.env.INSTAGRAM_LONG_LIVED_TOKEN;
// let tokenExpiry = new Date(process.env.INSTAGRAM_TOKEN_EXPIRY || 0);

// async function refreshTokenIfNeeded() {
//   const now = new Date();
//   if (now >= tokenExpiry) {
//     const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longLivedToken}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     longLivedToken = data.access_token;
//     tokenExpiry = new Date(Date.now() + 55 * 24 * 60 * 60 * 1000); // 55 giorni
//     // opzionale: salva token e expiry su file o DB leggero
//   }
// }

// export default async function handler(req, res) {
//   try {
//     await refreshTokenIfNeeded();

//     const instaUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${longLivedToken}`;
//     const response = await fetch(instaUrl);
//     const posts = await response.json();

//     res.status(200).json(posts.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }
