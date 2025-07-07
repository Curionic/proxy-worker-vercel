export default async function handler(req, res) {
  try {
    const html = await fetch("https://solscan.io/token/9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    }).then(r => r.text());

    // Updated regex: finds the first "Holders" div and grabs the next div with a number
    const match = html.match(/Holders<\/div>\s*<div[^>]*>([\d,]+)<\/div>/i);

    if (!match) {
      return res.status(500).json({ error: "Holder count not found in HTML" });
    }

    const count = parseInt(match[1].replace(/,/g, ""), 10);
    return res.status(200).json({ holders: count });

  } catch (err) {
    return res.status(500).json({ error: "Scraping failed", details: err.message });
  }
}


