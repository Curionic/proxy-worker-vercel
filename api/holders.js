export default async function handler(req, res) {
  try {
    const url = "https://dexscreener.com/solana/9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
    
    const html = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0" // spoof browser to avoid blocks
      }
    }).then(r => r.text());

    // Match the exact <span> with class and number
    const match = html.match(/<span class="text-subtitle-medium-16[^"]*">([\d,]+)<\/span>/);

    if (!match) {
      return res.status(500).json({ error: "Holder count not found in HTML" });
    }

    const holderCount = parseInt(match[1].replace(/,/g, ""), 10);
    return res.status(200).json({ holders: holderCount });

  } catch (err) {
    return res.status(500).json({ error: "Dexscreener scraping failed", details: err.message });
  }
}



