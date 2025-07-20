const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static("."));

app.get("/api/wallet/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const response = await fetch(`https://public-api.solscan.io/account/tokens?account=${encodeURIComponent(address)}`);
    if (!response.ok) throw new Error("Failed to fetch from Solscan");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
