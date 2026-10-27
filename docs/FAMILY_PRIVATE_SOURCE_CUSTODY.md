# Oiko Family — Custodia privata dei sorgenti e prova di autonomia

**Ricognizione:** 27 ottobre 2026 · **AppDeploy:** `oiko-family-staging-wanqjz` · **Snapshot:** `1793104971266`  
**Stato:** **repository privato operativo e compilazione indipendente superata**; ricostruzione backend e rilascio commerciale ancora da collaudare. Non pubblicare codice proprietario Family nel repository statico pubblico `manzo8b/oiko`.

## 1. Perché è un requisito di vendita o cessione

L'URL staging non è un repository sorgente trasferibile. Chi acquista un software deve poter ricostruire il frontend, applicare il database, sostituire i fornitori, ricevere aggiornamenti e dimostrare che i segreti non sono inclusi nel sorgente.

La differenza tra Oiko e Family deve restare netta: il codice del sito gratuito è già nel repository pubblico; il codice Family deve essere custodito separatamente se si persegue una futura licenza/cessione proprietaria.

## 2. Sorgenti Family verificati nell'ultimo snapshot

| Percorso | Caratteri letti | Linee | Stato |
| --- | ---: | ---: | --- |
| `index.html` | 309 | 13 | Letto |
| `package.json` | 680 | 31 | Letto |
| `postcss.config.js` | 81 | 7 | Letto |
| `src/App.tsx` | 107 | 5 | Letto |
| `src/FamilyInsights.tsx` | 6115 | 99 | Letto |
| `src/FamilyStaging.tsx` | 33803 | 769 | Letto |
| `src/family-export.ts` | 3541 | 81 | Letto |
| `src/family-upgrade.css` | 9096 | 95 | Letto |
| `src/family-utils.ts` | 816 | 26 | Letto |
| `src/family.css` | 5258 | 302 | Letto |
| `src/index.css` | 73 | 6 | Letto |
| `src/main.tsx` | 230 | 11 | Letto |
| `tailwind.config.js` | 163 | 7 | Letto |
| `tests/tests.json` | 5475 | 116 | Letto |
| `tsconfig.json` | 509 | 21 | Letto |
| `vite.config.ts` | 374 | 16 | Letto |

**Totale: 16 file, letti integralmente nello snapshot.** La scansione di pattern elementari non ha individuato valori con prefissi `sb_secret_`, blocchi PEM di chiave privata o pattern evidenti di password codificate, **ma non sostituisce una scansione completa dei segreti prima di ogni commit**. Una chiave Supabase *publishable* può comparire nel browser; ruoli admin e segreti devono rimanere solo server-side.

**Situazione successiva:** le 16 sorgenti sono state archiviate in `manzo8b/oiko-family-private`; 13 sono identiche al byte e 3 adattate per configurazione/branding/build. `package-lock.json` è versionato e `npm ci`, test e build hanno superato GitHub Actions. Le cinque migrazioni SQL originali sono state confrontate con il database e custodite nel repository privato. I test AppDeploy non diventano automaticamente test browser autonomi.

## 3. Deposito sorgenti — eseguito e verificato

- Repository: **[manzo8b/oiko-family-private](https://github.com/manzo8b/oiko-family-private)**, visibilità **Private** verificata con l'integrazione GitHub. Collegamento accessibile soltanto ad autorizzati.
- **16/16 file Family importati**: 13 identici, 3 modificati intenzionalmente (HTML title, package metadata/comandi, configurazione pubblicabile Supabase tramite variabili Vite).
- **5/5 migrazioni SQL originali** sotto `supabase/migrations` nel repository privato, versioni originali, contenuti ricontrollati contro `supabase_migrations.schema_migrations` senza esportare dati dei tester.
- `package-lock.json` versionato con **199 voci di pacchetto**; GitHub Actions esegue `npm ci`, i test e `npm run build` su checkout pulito. Risultato **success**: [esecuzione CI](https://github.com/manzo8b/oiko-family-private/actions/runs/40512028821).
- Nessun database, account o movimento dei tester è stato trasferito. L'attuale beta AppDeploy resta inalterata.

**Non è ancora provato** il funzionamento end-to-end della build privata con autenticazione, callback email e nuovo backend: mancano un ambiente di prova pulito con SQL riprodotto e la validazione runtime separata da AppDeploy.

## 4. Criteri di chiusura

- [x] Repository privato creato e visibilità **verificata dal connettore**.
- [x] Importati 16/16 file, confronto contenuto e lockfile versionato.
- [x] Frontend compilato da GitHub Actions senza AppDeploy (`npm ci`, test, `vite build`); runtime con nuovo Supabase ancora da verificare.
- [x] Cinque migrazioni custodite privatamente e confrontate con gli originali.
- [ ] Ricostruzione effettiva del database su ambiente isolato e test RLS/RPC.
- [ ] Test di login, inviti, revoca, scadenze e doppio pagamento in ambiente separato.
- [ ] Nessun segreto in client/repo e nessun dato utente pubblicato.
- [ ] Procedure di ripristino e cessione documentate.

**Non dichiarare Family autonomo o legalmente cedibile finché tutti i criteri non sono superati.**
