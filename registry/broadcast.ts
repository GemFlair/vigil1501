import { RegistryDoc } from "../components/OperationalRegistry";

export interface TacticalIntercept {
  id: string;
  status: string;
  content: string;
  tagline: string;
  url?: string; 
}

export const LATEST_INTERCEPT: TacticalIntercept = {
  id: "VIG-CZ-01",
  status: "PROACTIVE_HEURISTICS // LAYER_0.5",
  content: "Correct, @cz_binance. However, there is a systemic lag: Blacklists are reactive—someone has to be scammed first. VIGIL intercepts the pattern at Layer 0.5 before the first victim exists.",
  tagline: "DON'T BLOCK THE ADDRESS. BLOCK THE PATTERN.",
  url: "https://x.com/vigil_layer"
};

export interface PhaseConfig {
  label: string;
  subtext: string;
  icon: 'fingerprint' | 'chrome' | 'shield';
  actionType: 'DOC' | 'EXTERNAL';
  actionValue: string;
}

export const PHASE_UI_CONFIG: Record<number, PhaseConfig> = {
  1: {
    label: "EXPLORE IDENTITY MANIFEST",
    subtext: "Silo 01 // Identity Layer established",
    icon: "fingerprint",
    actionType: "DOC",
    actionValue: "identity_manifest"
  },
  10: {
    label: "INSTALL VIGIL EXTENSION",
    subtext: "Standard v1.0 // Global Mesh Synchronized",
    icon: "chrome",
    actionType: "EXTERNAL",
    actionValue: "https://chrome.google.com/webstore"
  }
};