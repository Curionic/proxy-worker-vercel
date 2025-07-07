export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug || slug.length === 0 || slug[0] !== 'holders') {
    return res.status(404).json({ error: 'Not found' });
  }

  const NGA_MINT = '9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk';
  const solscanUrl = `https://solscan.io/token/${NGA_MINT}`;

  try {
    const html = await fetch(solscanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html',
      },
    }).then((r) => r.text());

    const match = html.match(/Holders<\/div><div[^>]*?>([\d,]+)/);

    if (!match || !match[1]) {
      throw new Error('Could not extract holder count');
    }

    const holderCount = parseInt(match[1].replace(/,/g, ''), 10);

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ holders: holderCount });
  } catch (error) {
    console.error('Scraping error:', error.message);
    return res.status(500).json({ error: 'Failed to scrape holder count' });
  }
}
