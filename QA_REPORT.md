## Oiko v0.6 — QA 26 ottobre 2026

- 56 test Node automatici completati, inclusi 12 casi della previsione.
- Simulazione Chromium con database stub su 350, 390 e 1365 px: selezione dei mesi, riepiloghi, scaduti e dettagli corretti, nessuno scorrimento orizzontale, nessun errore JavaScript.
- Limite: il browser automatizzato con IndexedDB reale su HTTPS e il Safari iPhone reale non sono stati verificati da questo ambiente. La verifica sul dispositivo resta necessaria.
- Nessuna modifica a IndexedDB, JSON v1, grafica v0.5.1, pagamenti effettivi o allegati.

# QA Oiko v0.5.1 — 26 ottobre 2026

- **44/44 test Node superati** per logiche precedenti, versione grafica e regressioni dashboard.
- `node --check assets/app.mjs`: superato.
- Browser Chromium locale con **archivio simulato**: 350/390/1365 px; donut a cinque segmenti, sei mesi di trend, importi coerenti, nessun overflow orizzontale né errore JavaScript.
- Non verificati in questa esecuzione: IndexedDB reale nel browser, Safari iPhone, conservazione dopo disinstallazione o cambio dispositivo.
- Continuità: lo schema database e backup JSON non sono stati modificati.
