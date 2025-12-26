import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json({ limit: "10mb" }));

const TOKEN = "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"

const REPO = "LAMARQUE40/graphique-mail";
const BRANCH = "main";

app.post("/upload", async (req, res) => {
  const { filename, content } = req.body;

  const response = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filename}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Upload automatique",
        content: content,
        branch: BRANCH,
      }),
    }
  );

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Serveur OK"));
