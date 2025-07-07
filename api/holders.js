export default async function handler(req, res) {
  const MINT = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=6214b36e-8cd8-46f9-98ff-7af37a3dd570";
  const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

  // ✅ Enable CORS so browser-based code can fetch this
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const response = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getProgramAccounts",
        params: [
          TOKEN_PROGRAM_ID,
          {
            encoding: "jsonParsed",
            commitment: "confirmed",
            filters: [
              { dataSize: 165 },
              {
                memcmp: {
                  offset: 0,
                  bytes: MINT
                }
              }
            ]
          }
        ]
      })
    });

    const json = await response.json();
    const accounts = json?.result;

    if (!accounts || accounts.length === 0) {
      return res.status(500).json({ error: "No accounts returned", raw: json });
    }

    const uniqueOwners = new Set();

    for (const account of accounts) {
      const info = account.account.data.parsed.info;
      const balance = parseInt(info.tokenAmount.amount);
      if (balance > 0) {
        uniqueOwners.add(info.owner);
      }
    }

    return res.status(200).json({ holders: uniqueOwners.size });

  } catch (err) {
    return res.status(500).json({ error: "Fetch failed", details: err.message });
  }
}
