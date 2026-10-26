# Oiko v0.4.0 — Rapporto QA (26 ottobre 2026)

- **35/35 test Node** superati (`node --test`). Inclusi cinque nuovi test scadenze: giorno corrente, finestra 7/30, ora solare, storico pagamenti e occorrenza già saldata.
- Sintassi di `assets/app.mjs` e `assets/logic.mjs` verificata con `node --check`.
- Browser Chromium simulato con archivio in memoria: test di filtri **7 giorni / 30 giorni / Pagate**, visualizzazione scadenze, collegamenti e riepiloghi a 350, 390 e 1365 px. Nessuno scroll orizzontale e nessuna eccezione JS. Non equivale a una prova di IndexedDB reale.
- Il pulsante rapido flottante non si sovrappone più alla gestione delle scadenze.
- Conservato schema IndexedDB `oiko-local-v1`, versione 1, e formato backup `oiko-backup` versione 1; nessuna migrazione.
- **Da verificare su Safari iPhone**: dati storici presenti, filtri, registrazione pagamento, avanzamento della data ricorrente e backup, senza cancellare dati esistenti.
- **Limite dichiarato**: si visualizza la prossima occorrenza attiva per promemoria, non tutte le occorrenze future; i valori sono stime manuali, non movimenti bancari.
