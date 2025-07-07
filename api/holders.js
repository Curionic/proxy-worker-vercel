export default async function handler(req, res) {
  try {
    const tokenMint = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
    const apiURL = `https://public-api.solscan.io/token/holders?tokenAddress=${tokenMint}&limit=1`;

    const response = await fetch(apiURL, {
      headers: {
        "accept": "application/json"
      }
    });

    const raw = await response.text();

    // Debug log (optional): show in Vercel logs
    console.log("RAW SOLSCAN RESPONSE:", raw);

    const parsed = JSON.parse(raw); // this is where it previously crashed

    const holderCount = parsed.total;
    if (typeof holderCount !== "number") {
      return res.status(500).json({ error: "Missing 'total' in response", raw });
    }

    return res.status(200).json({ holders: holderCount });
  } catch (err) {
    return res.status(500).json({ error: "API call failed", details: err.message });
  }
}

