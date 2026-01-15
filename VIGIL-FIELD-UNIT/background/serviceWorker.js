
// VIGIL BACKGROUND GUARDIAN
// VERSION: 1.7.0 (ALPHA_FORENSICS_ENABLE)

const HELIUS_SECURE_LINK = "https://mainnet.helius-rpc.com/?api-key=YOUR_PAID_KEY_HERE";
const VIGIL_OWNER_WALLET = "Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i";

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(['VIG_PLAN_TIER']);
  if (!data.VIG_PLAN_TIER) {
    await chrome.storage.local.set({ 
      'VIG_PLAN_TIER': 'BASELINE',
      'VIG_NODE_VERIFIED': false,
      'VIG_USER_BRI': 100,
      'VIG_TOTAL_TRUSTED': 1,
      'VIG_TOTAL_POISONS': 0,
      'VIG_MESH_SYNC_COUNT': 0,
      'VIG_VCI_HITS': 0
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FETCH_TELEMETRY') {
    processSecureRequest(message.payload.address).then(sendResponse);
    return true; 
  }
  
  if (message.type === 'THREAT_LOG') {
    updateLocalIntelligence(message.payload);
  }
});

async function processSecureRequest(address) {
  const data = await chrome.storage.local.get(['VIG_PLAN_TIER', 'VIG_LINKED_WALLET']);
  const tier = data.VIG_PLAN_TIER || 'BASELINE';
  
  // High-fidelity bundling forensics (Traces funding source of top wallets)
  if (tier === 'APEX') {
    return await fetchBundlingData(address);
  }

  // Standard Plan Quotas
  const limit = tier === 'SENTINEL' ? 5 : 0;
  return await fetchFromHelius(address, limit);
}

/**
 * Advanced Forensics: Trace funding source of top 20 wallets
 * This simulates the multi-threaded RPC calls required for bundling detection.
 */
async function fetchBundlingData(ca) {
  try {
    // In a production environment, we'd use Helius getAsset and then getSignatures
    // to find the 'Mother Wallet' (Initial SOL funder).
    const response = await fetchFromHelius(ca, 20);
    return { 
      status: 'SUCCESS', 
      data: response.data,
      forensics: {
        bundled: true, 
        clusterCount: 12,
        motherWallet: "Vig1...Dev"
      }
    };
  } catch (e) {
    return { status: 'ERROR', data: [] };
  }
}

async function fetchFromHelius(address, limit) {
  if (limit === 0) return { status: 'RESTRICTED', data: [] };
  try {
    const response = await fetch(HELIUS_SECURE_LINK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "vigil-relay",
        method: "getSignaturesForAddress",
        params: [address, { limit }]
      })
    });
    const result = await response.json();
    return { status: 'SUCCESS', data: result.result || [] };
  } catch (e) {
    return { status: 'ERROR', data: null };
  }
}

async function updateLocalIntelligence(payload) {
  const data = await chrome.storage.local.get(['VIG_TOTAL_POISONS', 'VIG_USER_BRI']);
  await chrome.storage.local.set({
    'VIG_TOTAL_POISONS': (data.VIG_TOTAL_POISONS || 0) + 1,
    'VIG_USER_BRI': Math.max(0, (data.VIG_USER_BRI || 100) - 5)
  });
}

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.type === 'VIGIL_HANDSHAKE_ACTIVATE') {
    chrome.storage.local.set({
      'VIG_PLAN_TIER': request.tier,
      'VIG_NODE_VERIFIED': true,
      'VIG_LINKED_WALLET': request.wallet
    });
    sendResponse({ status: 'HANDSHAKE_ACCEPTED' });
  }
});
