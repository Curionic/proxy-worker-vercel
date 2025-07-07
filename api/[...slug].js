export default async function handler(req, res) {
  const HELIUS_API_KEY = 'e4c8c3bc-a78c-4f9f-a3ec-1b98dbfa6ce6';
  const NGA_MINT = '9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk';

  const url = `https://api.helius.xyz/v1/mintlist?api-key=${HELIUS_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mints: [NGA_MINT]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Helius error: ${errorText}`);
      throw new Error('Bad response from Helius');
    }

    const data = await response.json();

    const holderCount = data?.[0]?.ownership?.ownerCount ?? 0;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ holders: holderCount });
  } catch (e) {
    console.error('Fetch failed:', e);
    res.status(500).json({ error: 'Failed to fetch holder data' });
  }
}
