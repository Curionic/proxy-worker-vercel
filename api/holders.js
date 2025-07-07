export default async function handler(req, res) {
  try {
    const tokenMint = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
    const apiURL = `https://public-api.solscan.io/token/holders?tokenAddress=${tokenMint}&limit=1`;

    const response = await fetch(apiURL, {
      headers: { "accept": "application/json" }
    });

    const text = await response.text();
    console.log("RAW Solscan response:", text); // this will show up in Vercel logs

    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: "Invalid JSON", raw: text });
    }

    if (typeof json.total !== "number") {
      return res.status(500).json({ error: "Missing 'total'", raw: json });
    }

    return res.status(200).json({ holders: json.total });

  } catch (err) {
    return res.status(500).json({ error: "API call failed", details: err.message });
  }
}

