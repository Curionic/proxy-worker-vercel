export default async function handler(req, res) {
  const MINT = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
  const API_KEY = "6214b36e-8cd8-46f9-98ff-7af37a3dd570";
  const RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;

  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByMint",
        params: [
          MINT,
          { encoding: "jsonParsed", commitment: "confirmed" }
        ]
      })
    });

    const data = await response.json();

    const accounts = data?.result?.value;
    if (!accounts) {
      return res.status(500).json({ error: "No token accounts returned", raw: data });
    }

    const holders = new Set();

    for (const account of accounts) {
      const info = account.account.data.parsed.info;
      if (parseInt(info.tokenAmount.amount) > 0) {
        holders.add(info.owner);
      }
    }

    return res.status(200).json({ holders: holders.size });

  } catch (error) {
    return res.status(500).json({ error: "Helius fetch failed", details: error.message });
  }
}
