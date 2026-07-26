// Vercel Serverless Function: Google Cloud Text-to-Speech 중계 엔드포인트
// POST { text: string, languageCode?: string, voiceName?: string, audioEncoding?: string }
// -> { audioContent: string(base64), audioEncoding: string }
//
// 필수 환경 변수: TTS_KEY (Cloud Text-to-Speech API가 활성화된 Google API 키)

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.TTS_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: TTS_KEY is not set" });
    return;
  }

  const { text, languageCode, voiceName, audioEncoding } = req.body || {};
  if (typeof text !== "string" || !text.trim()) {
    res.status(400).json({ error: "'text' (string) is required" });
    return;
  }

  const requestBody = {
    input: { text },
    voice: {
      languageCode: languageCode || "ko-KR",
      ...(voiceName ? { name: voiceName } : {}),
    },
    audioConfig: { audioEncoding: audioEncoding || "LINEAR16", sampleRateHertz: 24000 },
  };

  try {
    const upstream = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
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

    res.status(200).json({
      audioContent: data.audioContent,
      audioEncoding: requestBody.audioConfig.audioEncoding,
    });
  } catch (err) {
    res.status(502).json({ error: "Failed to reach Text-to-Speech API", detail: String(err) });
  }
};
