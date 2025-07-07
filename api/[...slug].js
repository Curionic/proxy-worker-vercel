export default async function handler(req, res) {
  const HELIUS_API_KEY = 'e4c8c3bc-a78c-4f9f-a3ec-1b98dbfa6ce6';
  const NGA_MINT = '9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk';

  const url = `https://api.helius.xyz/v1/addresses/${NGA_MINT}/holders?api-key=${HELIUS_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Helius error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    const holderCount = Array.isArray(data) ? data.length : 0;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ holders: holderCount });
  } catch (e) {
    console.error('Fetch failed:', e);
    res.status(500).json({ error: 'Failed to fetch holder data' });
  }
}
