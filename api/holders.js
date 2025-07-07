export default async function handler(req, res) {
  try {
    const tokenMint = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
    const apiKey = "6214b36e-8cd8-46f9-98ff-7af37a3dd570";
    const url = `https://api.helius.xyz/v0/token/${tokenMint}/accounts?api-key=${apiKey}`;

    const response = await fetch(url, {
      headers: { accept: "application/json" }
    });

    const json = await response.json();

    const holders = new Set();

    for (const account of json) {
      if (account.owner) {
        holders.add(account.owner);
      }
    }

    return res.status(200).json({ holders: holders.size });

  } catch (err) {
    return res.status(500).json({ error: "Helius token account fetch failed", details: err.message });
  }
}



