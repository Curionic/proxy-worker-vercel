export default async function handler(req, res) {
  try {
    const tokenMint = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
    const apiURL = `https://public-api.solscan.io/token/holders?tokenAddress=${tokenMint}&limit=1`;

    const { total } = await fetch(apiURL, {
      headers: { "accept": "application/json" }
    }).then(r => r.json());

    if (typeof total !== "number") {
      return res.status(500).json({ error: "Invalid API response" });
    }

    return res.status(200).json({ holders: total });
  } catch (err) {
    return res.status(500).json({ error: "API call failed", details: err.message });
  }
}
