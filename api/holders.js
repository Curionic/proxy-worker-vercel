export default async function handler(req, res) {
  try {
    const mint = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
    const url = `https://api.solana.fm/v0/accounts/${mint}/token-holders?limit=1`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json"
      }
    });

    const data = await response.json();

    const holderCount = data?.total;

    if (typeof holderCount !== "number") {
      return res.status(500).json({ error: "Holder count missing", raw: data });
    }

    return res.status(200).json({ holders: holderCount });

  } catch (err) {
    return res.status(500).json({ error: "Solana.fm fetch failed", details: err.message });
  }
}


