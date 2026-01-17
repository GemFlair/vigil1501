
// VIGIL HUD: ALERT_MARKET_INTEL
// VERSION: 2.0.0 (SOVEREIGN_TRADER_EDITION)

export function render(ca, index, telemetry) {
  const host = document.createElement('div');
  host.id = 'vigil-hud-root';
  host.style.cssText = 'position: fixed; z-index: 2147483647; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
  const shadow = host.attachShadow({ mode: 'open' });

  // Forensics Engine Simulation (Simulating real-time Helius analytics)
  const isRugRisk = ca.includes('RUG') || ca.includes('Rug') || Math.random() > 0.6;
  const metrics = {
    bundled: isRugRisk ? 42.8 : 4.1,
    clusters: isRugRisk ? 12 : 0,
    top10: isRugRisk ? 68.4 : 12.1,
    devRugs: isRugRisk ? 8 : 0,
    devRep: isRugRisk ? 'MALICIOUS' : 'CLEAN',
    mcap: isRugRisk ? '$8.2k' : '$142k'
  };

  shadow.innerHTML = `
    <style>
      :host { --cyan: #22d3ee; --bg: #050505; --red: #ef4444; --emerald: #10b981; --font: 'Inter', system-ui, sans-serif; --mono: 'JetBrains Mono', monospace; }
      
      .backdrop { position: fixed; inset: 0; background: rgba(5, 5, 5, 0.85); backdrop-filter: blur(40px); opacity: 0; transition: opacity 0.5s ease; pointer-events: auto; display: flex; align-items: center; justify-content: center; font-family: var(--font); }
      .backdrop.active { opacity: 1; }
      
      .card { width: 800px; background: rgba(10, 10, 10, 0.8); border: 2px solid ${isRugRisk ? 'var(--red)' : 'var(--cyan)'}; border-radius: 48px; padding: 56px; color: white; box-shadow: 0 50px 100px rgba(0,0,0,1); display: flex; flex-direction: column; gap: 40px; position: relative; overflow: hidden; backdrop-filter: blur(20px); }
      
      .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: ${isRugRisk ? 'var(--red)' : 'var(--cyan)'}; opacity: 0.2; box-shadow: 0 0 20px currentColor; animation: scan 3s linear infinite; }
      @keyframes scan { from { transform: translateY(-100vh); } to { transform: translateY(100vh); } }

      .header { display: flex; justify-content: space-between; align-items: flex-start; }
      .brand { display: flex; align-items: center; gap: 24px; }
      .icon { width: 72px; height: 72px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 36px; }
      .title h3 { font-size: 28px; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 0; letter-spacing: -0.02em; color: ${isRugRisk ? 'var(--red)' : 'var(--cyan)'}; }
      .ca-string { font-family: var(--mono); font-size: 11px; color: #555; letter-spacing: 0.1em; margin-top: 6px; }

      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
      .module { background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05); border-radius: 32px; padding: 28px; position: relative; }
      .mod-label { font-size: 9px; font-weight: 900; color: #444; letter-spacing: 0.4em; text-transform: uppercase; margin-bottom: 20px; display: block; }
      
      .stat-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; }
      .stat-val { font-size: 32px; font-weight: 900; font-style: italic; line-height: 1; color: ${isRugRisk ? 'var(--red)' : 'var(--emerald)'}; }
      .stat-lbl { font-size: 10px; font-weight: 900; color: #666; text-transform: uppercase; }
      
      .rail { height: 6px; background: #111; border-radius: 10px; overflow: hidden; margin-bottom: 16px; }
      .fill { height: 100%; border-radius: 10px; transition: width 2s cubic-bezier(0.16, 1, 0.3, 1); background: ${isRugRisk ? 'var(--red)' : 'var(--emerald)'}; }

      .dev-dna { padding: 24px; border-radius: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); }
      .dna-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
      .dna-title { font-size: 11px; font-weight: 900; color: #888; text-transform: uppercase; }
      .dna-tag { padding: 4px 10px; border-radius: 6px; font-size: 8px; font-weight: 900; background: ${isRugRisk ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}; color: ${isRugRisk ? 'var(--red)' : 'var(--emerald)'}; border: 1px solid currentColor; }

      .verdict { padding: 32px; border-radius: 32px; background: ${isRugRisk ? 'rgba(239, 68, 68, 0.05)' : 'rgba(34, 211, 238, 0.05)'}; border: 1px solid ${isRugRisk ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 211, 238, 0.2)'}; }
      .verdict h4 { font-size: 11px; font-weight: 900; color: ${isRugRisk ? 'var(--red)' : 'var(--cyan)'}; letter-spacing: 0.5em; margin: 0 0 16px 0; text-transform: uppercase; }
      .verdict p { font-size: 18px; color: #ccc; font-style: italic; margin: 0; line-height: 1.6; }

      .btn { width: 100%; padding: 24px; border: none; border-radius: 24px; font-weight: 900; font-size: 12px; letter-spacing: 0.5em; cursor: pointer; transition: 0.3s; text-transform: uppercase; }
      .btn-abort { background: var(--red); color: white; box-shadow: 0 0 30px rgba(239, 68, 68, 0.4); }
      .btn-proceed { background: white; color: black; }
      .btn-proceed:hover { background: var(--cyan); color: white; box-shadow: 0 0 40px var(--cyan); }
    </style>
    <div class="backdrop" id="b">
      <div class="card">
        <div class="scan-line"></div>
        <div class="header">
          <div class="brand">
            <div class="icon">${isRugRisk ? '💀' : '📡'}</div>
            <div class="header-info">
              <h3>${isRugRisk ? 'High Risk Cluster' : 'Strategic Alpha Intel'}</h3>
              <div class="ca-string">CONTRACT: ${ca.slice(0, 16)}...${ca.slice(-4)}</div>
            </div>
          </div>
          <div style="text-align: right">
            <div style="font-size: 10px; font-weight: 900; color: #444; letter-spacing: 0.2em; text-transform: uppercase;">Node Stability</div>
            <div style="font-size: 24px; font-weight: 900; color: var(--emerald); font-style: italic;">OPERATIONAL</div>
          </div>
        </div>

        <div class="grid">
          <div class="module">
            <span class="mod-label">Supply Distribution</span>
            <div class="stat-row">
              <span class="stat-lbl">Top 10 Holders Own</span>
              <span class="stat-val">${metrics.top10}%</span>
            </div>
            <div class="rail"><div class="fill" style="width: ${metrics.top10}%"></div></div>
            <p style="font-size: 9px; color: #555; font-weight: 900; text-transform: uppercase;">Warning: Threshold for organic growth is 15%.</p>
          </div>

          <div class="module">
            <span class="mod-label">Bundling Forensic</span>
            <div class="stat-row">
              <span class="stat-lbl">Supply Bundled by Dev</span>
              <span class="stat-val">${metrics.bundled}%</span>
            </div>
            <div class="rail"><div class="fill" style="width: ${metrics.bundled}%"></div></div>
            <p style="font-size: 9px; color: #555; font-weight: 900; text-transform: uppercase;">Detection: ${metrics.clusters} wallets funded by single source.</p>
          </div>
        </div>

        <div class="dev-dna">
          <div class="dna-header">
             <span class="dna-title">Developer DNA Signature</span>
             <span class="dna-tag">${metrics.devRep} PROVENANCE</span>
          </div>
          <p style="font-size: 14px; color: #666; font-style: italic; margin: 0;">
            ${isRugRisk 
              ? `Adversary Alert: Deployer has initiated ${metrics.devRugs} rug-pulls in the last 48h. Extreme mal-intent detected.` 
              : `Clean Registry: No malicious cluster associations found. Developer history indicates stable retail-growth intent.`}
          </p>
        </div>

        <div class="verdict">
          <h4>Sentinel Tactical Conclusion</h4>
          <p>"${isRugRisk 
            ? `Mathematical Trap: Supply concentration and bundling logic confirm this is a pre-programmed exit. DO NOT DEPLOY CAPITAL.` 
            : `Organic Momentum: High distribution parity. Volume source appears decentralized. Target is suitable for strategic entry.`}"
          </p>
        </div>

        <button class="btn ${isRugRisk ? 'btn-abort' : 'btn-proceed'}" id="c">
          ${isRugRisk ? 'Abort Transaction' : 'Settle Intent: Proceed'}
        </button>
      </div>
    </div>
  `;

  document.documentElement.appendChild(host);
  setTimeout(() => shadow.getElementById('b').classList.add('active'), 10);
  
  shadow.getElementById('c').onclick = () => {
    shadow.getElementById('b').classList.remove('active');
    setTimeout(() => host.remove(), 400);
  };
}
