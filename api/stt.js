// Vercel Serverless Function: Google Cloud Speech-to-Text 중계 엔드포인트
// POST { audioContent: string(base64), languageCode?: string, encoding?: string, sampleRateHertz?: number }
// -> { transcript: string }
//
// 필수 환경 변수: API_SECRET_KEY (Cloud Speech-to-Text API가 활성화된 Google API 키)

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.API_SECRET_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: API_SECRET_KEY is not set" });
    return;
  }

  const { audioContent, languageCode, encoding, sampleRateHertz } = req.body || {};
  if (typeof audioContent !== "string" || !audioContent.trim()) {
    res.status(400).json({ error: "'audioContent' (base64 string) is required" });
    return;
  }

  const requestBody = {
    config: {
      encoding: encoding || "WEBM_OPUS",
      sampleRateHertz: sampleRateHertz || 48000,
      languageCode: languageCode || "ko-KR",
    },
    audio: { content: audioContent },
  };

  try {
    const upstream = await fetch("https://speech.googleapis.com/v1/speech:recognize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: data?.error?.message || "Upstream API error" });
      return;
    }

    const transcript =
      data?.results?.map((r) => r.alternatives?.[0]?.transcript || "").join(" ").trim() ?? "";
    res.status(200).json({ transcript });
  } catch (err) {
    res.status(502).json({ error: "Failed to reach Speech-to-Text API", detail: String(err) });
  }
};
