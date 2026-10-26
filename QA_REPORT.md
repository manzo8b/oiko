# Oiko v0.5 — Rapporto QA (26 ottobre 2026)

- Nuova identità viola/giallo, fondi neutri e stati semantici distinti. Nessuna operazione finanziaria o schema dati modificato.
- Test Node: 39/39 superati e moduli verificati con node --check.
- Browser Chromium con dati simulati: dashboard, filtri Scadenze, pagamento manuale e navigazione a 350/390/1365 px; nessun errore JS, nessuno scorrimento orizzontale.
- Il test browser usa archiviazione simulata e **non sostituisce** il collaudo dell'IndexedDB in Safari iPhone.
- Sostituiti logo SVG e tre icone raster nella nuova palette.
- Verifica su iPhone: aggiornamento grafico, presenza vecchie spese, filtri, backup. Non eliminare icona Home per aggiornarla.
