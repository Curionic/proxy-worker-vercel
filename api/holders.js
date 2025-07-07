export default async function handler(req, res) {
  try {
    const html = await fetch("https://solscan.io/token/9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk", {
      headers: { "User-Agent": "Mozilla/5.0" }
    }).then(r => r.text());

    // More forgiving match between "Holders" label and number div
    const match = html.match(/Holders<\/div>[\s\S]{0,300}?<div[^>]*>([\d,]+)<\/div>/);

    if (!match) {
      return res.status(500).json({ error: "Holder count not found" });
    }

    const holderCount = parseInt(match[1].replace(/,/g, ""), 10);
    res.status(200).json({ holders: holderCount });
  } catch (err) {
    res.status(500).json({ error: "Scraping failed", details: err.message });
  }
}

