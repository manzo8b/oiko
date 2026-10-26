# QA Oiko v0.5.1 — 26 ottobre 2026

- **44/44 test Node superati** per logiche precedenti, versione grafica e regressioni dashboard.
- `node --check assets/app.mjs`: superato.
- Browser Chromium locale con **archivio simulato**: 350/390/1365 px; donut a cinque segmenti, sei mesi di trend, importi coerenti, nessun overflow orizzontale né errore JavaScript.
- Non verificati in questa esecuzione: IndexedDB reale nel browser, Safari iPhone, conservazione dopo disinstallazione o cambio dispositivo.
- Continuità: lo schema database e backup JSON non sono stati modificati.
