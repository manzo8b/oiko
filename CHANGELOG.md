# Changelog Oiko

## v0.2.0 — Identità visiva e rapidità operativa (2026-10-26)

- Nuovo marchio Oiko con pittogramma casa + grafico e payoff **«La tua casa è OK.»**.
- Palette verde bosco, salvia, avorio e oro; interfaccia responsive per iPhone e desktop.
- Dashboard con riepilogo speso, budget e scadenze; azioni dirette «Registra una spesa» e «Vedi scadenze».
- Barra di navigazione con icone vettoriali e pulsante rapido mobile per aggiungere una spesa.
- Manifest web e icone per l'installazione sulla schermata Home (nessuna richiesta di accesso a dati bancari).
- Nessuna migrazione IndexedDB: stesso database `oiko-local-v1`, stesse strutture e backup v1.
- Nessuna funzione finanziaria fittizia: il valore esposto indica spese registrate, non saldo bancario.

# Oiko Changelog

## v0.1.1 — Preparazione test GitHub Pages — 23 ottobre 2026

- Aggiunta verifica automatica di struttura, categorie e risorse locali.
- Aggiunti test di casi limite per date, importi, categorie e link esterni.
- Applicata una Content Security Policy di base nel documento HTML.
- Rifiutati URL HTTPS contenenti credenziali nella directory dei fornitori.
- Predisposta GitHub Actions `Oiko QA` per eseguire i test al push.
- Aggiunti manuali di pubblicazione e collaudo Safari iPhone.
- Chiariti i limiti del browser di test: nessun collaudo reale di IndexedDB/Safari iOS disponibile in questo ambiente.

## v0.1 — 23 ottobre 2026

- MVP statico: spese, scadenze, report, impostazioni, backup e allegati.
