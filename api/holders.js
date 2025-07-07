export default async function handler(req, res) {
  const RPC_URL = "https://api.mainnet-beta.solana.com";
  const mintAddress = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";

  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByMint",
        params: [
          mintAddress,
          { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
          { encoding: "jsonParsed" }
        ]
      })
    });

    const data = await response.json();

    if (data?.result?.value) {
      const holderCount = data.result.value.length;
      res.status(200).json({ holders: holderCount });
    } else {
      res.status(500).json({ error: "No data returned", details: data });
    }

  } catch (err) {
    res.status(500).json({ error: "RPC fetch failed", details: err.message });
  }
}
