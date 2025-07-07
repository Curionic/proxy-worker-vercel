export default async function handler(req, res) {
  const HELIUS_KEY = 'e4c8c3bc-a78c-4f9f-a3ec-1b98dbfa6ce6';
  const NGA_MINT = '9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk';

  const url = `https://api.helius.xyz/v1/token-holders?api-key=${HELIUS_KEY}&mint=${NGA_MINT}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      console.error('Helius error:', error);
      return res.status(500).json({ error: 'Helius failed' });
    }

    const data = await response.json();

    // token-holders returns array of holders
    const holderCount = Array.isArray(data) ? data.length : 0;

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ holders: holderCount });
  } catch (err) {
    console.error('Fetch failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
