// Vercel Serverless Function: Gemini 채팅 중계 엔드포인트
// POST { message: string, history?: Array<{ role: "user" | "model", text: string }>, model?: string }
// -> { reply: string }
//
// 필수 환경 변수: CHAT_API_KEY (Gemini API 키, Vercel 프로젝트 설정에서 등록)

const DEFAULT_MODEL = "gemini-2.5-flash";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.CHAT_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: CHAT_API_KEY is not set" });
    return;
  }

  const { message, history, model } = req.body || {};
  if (typeof message !== "string" || !message.trim()) {
    res.status(400).json({ error: "'message' (string) is required" });
    return;
  }

  const contents = [];
  if (Array.isArray(history)) {
    for (const turn of history) {
      if (!turn || typeof turn.text !== "string") continue;
      const role = turn.role === "model" ? "model" : "user";
      contents.push({ role, parts: [{ text: turn.text }] });
    }
  }
  contents.push({ role: "user", parts: [{ text: message }] });

  const modelId = typeof model === "string" && model.trim() ? model : DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`;

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({ contents }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: data?.error?.message || "Upstream API error" });
      return;
    }

    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";
    res.status(200).json({ reply });
  } catch (err) {
    res.status(502).json({ error: "Failed to reach Gemini API", detail: String(err) });
  }
};
