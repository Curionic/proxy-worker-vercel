export default async function handler(req, res) {
  const html = await fetch("https://solscan.io/token/9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk", {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  }).then(r => r.text());

  const match = html.match(/Holders<\/div>.*?<div[^>]*>([\d,]+)<\/div>/s);

  if (!match) {
    return res.status(500).json({ error: "Holder count not found" });
  }

  const holderCount = parseInt(match[1].replace(/,/g, ""), 10);
  res.status(200).json({ holders: holderCount });
}
