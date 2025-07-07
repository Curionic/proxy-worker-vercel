export default async function handler(req, res) {
  const HELIUS_API_KEY = 'e4c8c3bc-a78c-4f9f-a3ec-1b98dbfa6ce6';
  const NGA_MINT = '9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk';

  const url = `https://mainnet.helius.xyz/v1/token-metadata?api-key=${HELIUS_API_KEY}&mint=${NGA_MINT}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const holderCount = data?.tokenInfo?.numberOfHolders || 0;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ holders: holderCount });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch holder data' });
  }
}

