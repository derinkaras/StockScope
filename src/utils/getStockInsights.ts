import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_AI_KEY;

// Set how long the cache is valid (in milliseconds)
const CACHE_DURATION = 1000 * 60 * 60 * 6; // 6 hours

export async function getStockInsights(symbol: string) {
    const today = new Date().toISOString().split("T")[0];

    const cachedRaw = localStorage.getItem(symbol);
    if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        const cacheTime = new Date(cached.timestamp).getTime();
        const now = Date.now();

        if (now - cacheTime < CACHE_DURATION) {
            console.log("✅ Using cached data");
            return cached.data;
        }
    }

    const prompt = `
        You are a top-tier financial analyst.
        
        Provide a concise but detailed JSON summary for the stock symbol "${symbol}", including analysis up to and including ${today}. The goal is to inform investors with actionable insights, not generic summaries. Use real, reputable news sources (e.g. Bloomberg, CNBC, Reuters) and factor in live public sentiment and social signals where available.
        
        Only return valid JSON like the structure below:
        
        {
          "symbol": string,
          "companyName": string,
          "sentiment": "positive" | "negative" | "neutral",
          "priceOutlook": {
            "shortTerm": string,
            "longTerm": string
          },
          "investmentSignals": string[],
          "riskFactors": string[],
          "valuation": {
            "peRatio": string,
            "comparisonToIndustry": string
          },
          "analystConsensus": {
            "rating": "buy" | "hold" | "sell",
            "rationale": string
          },
          "newsArticles": [
            {
              "headline": string,
              "summary": string,
              "url": string,
              "source": string,
              "imageUrl": string
            }
          ]
        }

        Do not include markdown, intro, or anything outside the JSON block. Ensure insights are sharp and valuable to investors.
    `.trim();

    try {
        const res = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a financial analysis assistant." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.3,
                max_tokens: 1000
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );

        const content = res.data.choices[0].message.content.trim();
        console.log("🔍 GPT response:\n", content);

        const jsonStart = content.indexOf("{");
        const jsonEnd = content.lastIndexOf("}");
        const jsonText = content.slice(jsonStart, jsonEnd + 1);

        const parsed = JSON.parse(jsonText);

        // Save data with a timestamp
        localStorage.setItem(
            symbol,
            JSON.stringify({
                timestamp: new Date().toISOString(),
                data: parsed
            })
        );

        console.log("🌐 Retrieved new data from API");
        return parsed;

    } catch (err) {
        console.error("❌ Error fetching stock data:", err);
        throw err;
    }
}
