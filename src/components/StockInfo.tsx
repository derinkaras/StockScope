import { useEffect, useState } from "react";
import { getStockInsights } from "../utils/getStockInsights";

const StockInfo = ({ stockAbbrev }: { stockAbbrev: string }) => {
    const [stockInsights, setStockInsights] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchInsights() {
            try {
                setLoading(true);
                const insights = await getStockInsights(stockAbbrev);
                setStockInsights(insights);
            } catch (err) {
                setStockInsights({ error: `Failed to fetch insights: ${err.message}` });
            } finally {
                setLoading(false);
            }
        }
        fetchInsights();
    }, [stockAbbrev]);

    if (loading) {
        return (
            <div className="flex flex-1 h-full w-full flex-col items-center justify-center gap-2">
                <div className="h-10 w-10 border-4 border-link border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-link">Loading insights...</p>
            </div>
        );
    }

    if (stockInsights?.error) {
        return <p className="text-red-500">{stockInsights.error}</p>;
    }

    return (
        <div className="p-6 max-w-3xl w-full rounded-3xl bg-background-soft/80 backdrop-blur-lg shadow-2xl text-white space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col items-center gap-1">
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-transparent bg-clip-text tracking-wide">
                    {stockInsights.symbol}
                </h1>
                <h2 className="text-lg text-muted">{stockInsights.companyName}</h2>
                <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider font-semibold bg-gradient-to-r text-black from-green-300 to-emerald-500 shadow-md`}>
                    {stockInsights.sentiment}
                </span>
            </div>

            {/* Card Blocks */}
            <div className="grid gap-5">
                <InfoCard title="📈 Price Outlook">
                    <DataRow label="Short-Term" value={stockInsights.priceOutlook?.shortTerm} />
                    <DataRow label="Long-Term" value={stockInsights.priceOutlook?.longTerm} />
                </InfoCard>

                <InfoCard title="🚀 Investment Signals" items={stockInsights.investmentSignals} />
                <InfoCard title="⚠️ Risk Factors" items={stockInsights.riskFactors} />

                <InfoCard title="💸 Valuation">
                    <DataRow label="P/E Ratio" value={stockInsights.valuation?.peRatio} />
                    <DataRow label="Industry Comparison" value={stockInsights.valuation?.comparisonToIndustry} />
                </InfoCard>

                <InfoCard title="📊 Analyst Consensus">
                    <DataRow label="Rating" value={stockInsights.analystConsensus?.rating} />
                    <DataRow label="Rationale" value={stockInsights.analystConsensus?.rationale} />
                </InfoCard>

                <InfoCard title="📰 Latest News">
                    <div className="grid gap-4">
                        {stockInsights.newsArticles?.map((article: any, idx: number) => (
                            <div key={idx} className="flex gap-4 bg-background-muted/50 rounded-xl p-3 shadow-sm">
                                {article.imageUrl && (
                                    <img
                                        src={article.imageUrl}
                                        alt="Article"
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex-1">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-link hover:underline text-base"
                                    >
                                        {article.headline}
                                    </a>
                                    <p className="text-sm mt-1">{article.summary}</p>
                                    <p className="text-xs text-muted mt-1">Source: {article.source}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </InfoCard>
            </div>
        </div>
    );
};

export default StockInfo;

// 🧩 Styled reusable section box
const InfoCard = ({
                      title,
                      children,
                      items,
                  }: {
    title: string;
    children?: React.ReactNode;
    items?: string[];
}) => (
    <div className="rounded-xl bg-background-muted p-4 shadow-sm hover:shadow-link backdrop-blur-sm space-y-3 hover:scale-102 transition-transform duration-200">
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
        {items ? (
            <ul className="list-disc list-inside text-sm text-white/80 space-y-1 pl-2">
                {items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        ) : (
            <div className="space-y-1">{children}</div>
        )}
    </div>
);

// 🧩 Row layout
const DataRow = ({ label, value }: { label: string; value: string }) => (
    <p className="text-sm">
        <span className="text-white/60 font-medium">{label}:</span>{" "}
        <span className="text-white/90">{value}</span>
    </p>
);
