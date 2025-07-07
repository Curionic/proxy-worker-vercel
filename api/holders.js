export default async function handler(req, res) {
  try {
    const tokenAddress = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
    const url = `https://public-api.birdeye.so/public/token/${tokenAddress}`;

    const response = await fetch(url, {
      headers: {
        "accept": "application/json"
      }
    });

    const json = await response.json();

    const holderCount = json.data?.holders ?? null;

    if (!holderCount || typeof holderCount !== "number") {
      return res.status(500).json({ error: "Could not extract holder count", raw: json });
    }

    return res.status(200).json({ holders: holderCount });

  } catch (err) {
    return res.status(500).json({ error: "Birdeye fetch failed", details: err.message });
  }
}


