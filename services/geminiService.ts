
import { GoogleGenAI, Type } from "@google/genai";

export type IntentCategory = 'INFO' | 'CAUTION' | 'TRUSTED' | 'POISON' | 'NEW' | 'SPOOF' | 'MARKET_INTEL';

export interface UsageData {
  promptTokens: number;
  candidatesTokens: number;
  totalTokens: number;
  latencyMs: number;
}

export interface ThreatAnalysisResponse {
  riskScore: number;
  threatCategory: string;
  intentState: IntentCategory; 
  similarityIndex: number;
  reasoning: string;
  advisory: string;
  isPoisoningAttempt: boolean;
  onChainAge: string;
  globalReputation: 'CLEAN' | 'FLAGGED' | 'UNKNOWN';
  mismatchDetails: {
    prefixMatch: boolean;
    suffixMatch: boolean;
    entropyCheck: string;
  };
  evidenceFlags: string[];
}

export interface MarketIntelResponse {
  bundledSupply: number;
  clusterCount: number;
  devWalletsConnected: number;
  nonDevWalletsConnected: number;
  distribution: {
    top10Count: number;
    top20Count: number;
    top50Count: number;
  };
  activity1h: {
    newBuyers: number;
    oldSellers: number;
  };
  creatorReputation: 'HIGH' | 'MEDIUM' | 'LOW' | 'MALICIOUS';
  honeypotRisk: 'NONE' | 'LOW' | 'CRITICAL';
  liquidityStatus: string;
  verdict: string;
  signals: {
    label: string;
    value: string;
    state: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  }[];
}

export interface ReputationSynthesisResponse {
  reputationScore: number;
  synthesis: string;
  verdict: string;
  sentinelSignals: {
    label: string;
    value: string;
    state: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  }[];
}

export interface InterceptionSynthesisResponse {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'MALICIOUS';
  confidence: number;
  clusterMatch: string;
  threatLabel: string;
  telemetry: string[];
}

export interface CognitiveAutopsyResponse {
  autopsy: string;
  biologicalVulnerability: string;
  visualAnchor: string;
}

export const analyzeSecurityIntent = async (
  currentAddress: string, 
  historicalAddress: string,
  sourceContext: string = 'UNKNOWN'
): Promise<{ data: ThreatAnalysisResponse; usage: UsageData }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const start = Date.now();
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `FAST_SECURITY_AUDIT:
      CONTEXT: "${sourceContext}"
      HIST: "${historicalAddress}"
      CURR: "${currentAddress}"`,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskScore: { type: Type.NUMBER },
          threatCategory: { type: Type.STRING },
          intentState: { type: Type.STRING, enum: ['INFO', 'CAUTION', 'TRUSTED', 'POISON', 'NEW', 'SPOOF', 'MARKET_INTEL'] },
          similarityIndex: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          advisory: { type: Type.STRING },
          isPoisoningAttempt: { type: Type.BOOLEAN },
          onChainAge: { type: Type.STRING },
          globalReputation: { type: Type.STRING, enum: ['CLEAN', 'FLAGGED', 'UNKNOWN'] },
          mismatchDetails: {
            type: Type.OBJECT,
            properties: {
              prefixMatch: { type: Type.BOOLEAN },
              suffixMatch: { type: Type.BOOLEAN },
              entropyCheck: { type: Type.STRING }
            },
            required: ["prefixMatch", "suffixMatch", "entropyCheck"]
          },
          evidenceFlags: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["riskScore", "threatCategory", "intentState", "similarityIndex", "reasoning", "advisory", "isPoisoningAttempt", "onChainAge", "globalReputation", "mismatchDetails", "evidenceFlags"]
      }
    }
  });

  const latency = Date.now() - start;
  const usage: UsageData = {
    promptTokens: response.usageMetadata?.promptTokenCount || 0,
    candidatesTokens: response.usageMetadata?.candidatesTokenCount || 0,
    totalTokens: response.usageMetadata?.totalTokenCount || 0,
    latencyMs: latency
  };

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return { data: JSON.parse(text), usage };
  } catch (e) {
    console.error("Gemini Parse Error:", e);
    throw new Error("Failed to parse security analysis");
  }
};

export const analyzeMarketIntel = async (ca: string): Promise<MarketIntelResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `MARKET_FORENSIC_AUTOPSY: "${ca}". 
    Analyze the following:
    1. Supply distribution: How many wallets hold top 10%, 20%, and 50% of supply?
    2. Bundling: How many wallets are funded by the deployer? Look for clusters.
    3. Activity: How many new buyers vs old sellers in last 1h?
    4. DEV DNA: Reputation of the creator wallet and history of rugged launches.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bundledSupply: { type: Type.NUMBER },
          clusterCount: { type: Type.NUMBER },
          devWalletsConnected: { type: Type.NUMBER },
          nonDevWalletsConnected: { type: Type.NUMBER },
          distribution: {
            type: Type.OBJECT,
            properties: {
              top10Count: { type: Type.NUMBER },
              top20Count: { type: Type.NUMBER },
              top50Count: { type: Type.NUMBER }
            },
            required: ["top10Count", "top20Count", "top50Count"]
          },
          activity1h: {
            type: Type.OBJECT,
            properties: {
              newBuyers: { type: Type.NUMBER },
              oldSellers: { type: Type.NUMBER }
            },
            required: ["newBuyers", "oldSellers"]
          },
          creatorReputation: { type: Type.STRING, enum: ['HIGH', 'MEDIUM', 'LOW', 'MALICIOUS'] },
          honeypotRisk: { type: Type.STRING, enum: ['NONE', 'LOW', 'CRITICAL'] },
          liquidityStatus: { type: Type.STRING },
          verdict: { type: Type.STRING },
          signals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.STRING },
                state: { type: Type.STRING, enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'] }
              },
              required: ["label", "value", "state"]
            }
          }
        },
        required: ["bundledSupply", "clusterCount", "devWalletsConnected", "nonDevWalletsConnected", "distribution", "activity1h", "creatorReputation", "honeypotRisk", "liquidityStatus", "verdict", "signals"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Failed to analyze market intel");
  }
};

export const analyzeAddressInterception = async (address: string): Promise<InterceptionSynthesisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `RETINAL_SHIELD_SCAN: "${address}". Determine if this is a known mimic or trusted protocol node.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verdict: { type: Type.STRING, enum: ['SAFE', 'SUSPICIOUS', 'MALICIOUS'] },
          confidence: { type: Type.NUMBER },
          clusterMatch: { type: Type.STRING },
          threatLabel: { type: Type.STRING },
          telemetry: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["verdict", "confidence", "clusterMatch", "threatLabel", "telemetry"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (e) {
    return { verdict: 'SUSPICIOUS', confidence: 50, clusterMatch: 'Unknown', threatLabel: 'Scan Failed', telemetry: [] };
  }
};

export const synthesizeAddressReputation = async (address: string): Promise<ReputationSynthesisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `SYNTHESIS: ADDR: "${address}". Technical reputation synthesis.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reputationScore: { type: Type.NUMBER },
          synthesis: { type: Type.STRING },
          verdict: { type: Type.STRING },
          sentinelSignals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.STRING },
                state: { type: Type.STRING, enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'] }
              },
              required: ["label", "value", "state"]
            }
          }
        },
        required: ["reputationScore", "synthesis", "verdict", "sentinelSignals"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Failed to synthesize reputation");
  }
};

export const generateCognitiveAutopsy = async (real: string, selected: string): Promise<CognitiveAutopsyResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `COGNITIVE_AUTOPSY: REAL_ADDR: "${real}", SELECTED_ADDR: "${selected}". Explain why a human eye might fail this check.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          autopsy: { type: Type.STRING },
          biologicalVulnerability: { type: Type.STRING },
          visualAnchor: { type: Type.STRING }
        },
        required: ["autopsy", "biologicalVulnerability", "visualAnchor"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Failed to generate autopsy");
  }
};
