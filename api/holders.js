export default async function handler(req, res) {
  const MINT_ADDRESS = "9ihdUdFC9swhCq5Ypg52fyfy7G4K7hcB8CJGpvJ8bonk";
  const RPC_URL = "https://api.mainnet-beta.solana.com";

  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByMint",
        params: [
          MINT_ADDRESS,
          { encoding: "jsonParsed" }
        ]
      })
    });

    const json = await response.json();
    const accounts = json?.result?.value;

    if (!accounts) {
      return res.status(500).json({ error: "Failed to fetch accounts" });
    }

    const holders = accounts.filter(
      (acc) => parseInt(acc.account.data.parsed.info.tokenAmount.amount) > 0
    );

    return res.status(200).json({ holders: holders.length });
  } catch (err) {
    return res.status(500).json({ error: "RPC fetch failed", details: err.message });
  }
}
