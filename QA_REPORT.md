# Oiko v0.3 · Rapporto QA (26 ottobre 2026)

- **30/30 test Node** superati con `npm test`.
- Verifica JS `node --check` completata per `app.mjs`, `logic.mjs`, `db.mjs`.
- Collaudo browser simulato a 350 px, 390 px, 1365 px: nessuno scorrimento orizzontale, nessun errore JavaScript; confermati inserimento spesa, creazione di un budget di categoria, segnalazione superamento soglia, modifica/lettura e rimozione limite.
- **Limite del collaudo browser:** il contesto utilizza una simulazione in memoria delle funzioni IndexedDB. **Non equivale a verificare la persistenza reale dopo il riavvio su Safari iPhone.**
- Lo schema IndexedDB e il formato di backup non sono stati cambiati; non avviene alcuna migrazione distruttiva.
- Da confermare su iPhone reale dopo il rilascio: mantenimento delle spese storiche, salvataggio della nuova preferenza, persistenza dopo chiusura, backup che include `categoryBudgetsCents` e ripristino in ambiente di prova.
- Non archiviare backup contenenti dati familiari nel repository pubblico.
