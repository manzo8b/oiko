# Oiko Family — Custodia privata dei sorgenti e prova di autonomia

**Ricognizione:** 27 ottobre 2026 · **AppDeploy:** `oiko-family-staging-wanqjz` · **Snapshot:** `1793104971266`  
**Stato:** inventario verificato, **archivio privato NON creato**. Non pubblicare codice proprietario Family nel repository statico pubblico `manzo8b/oiko`.

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

**Lacune rilevate:** non risulta `package-lock.json`; la raccolta `tests/tests.json` appartiene ai test AppDeploy e non dimostra da sola la riproducibilità autonoma della build. Le migrazioni Supabase storiche non sono ancora esportate in un repository privato.

## 3. Deposito sorgenti: operazione richiesta

Il collegamento GitHub attualmente disponibile in chat consente lettura e commit **in repository già esistenti**, ma non espone un'azione per creare un nuovo repository. Il proprietario può creare **un repository nuovo, vuoto e PRIVATO**, ad esempio `manzo8b/oiko-family-private`, da GitHub → New repository → Private. Non inizializzare con codice pubblico; verificarne visibilità e accessi prima di caricare i file.

**Non riutilizzare altri repository privati non pertinenti.** Non inserire i sorgenti Family nel repository pubblico o in un branch pubblico credendo che il branch sia riservato.

Una volta creato e accessibile al connettore:
1. Copiare tutti i 16 file dallo snapshot AppDeploy **senza alterarne il significato**.
2. Convertire URL/key della beta in configurazione per ambiente (`.env.example` senza segreti, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`), mantenendo lo staging funzionante.
3. Usare installazione dipendenze vincolata e generare un lockfile; build `npm ci && npm run build` su checkout pulito; verificare output della route base/family.
4. Esportare nell'archivio privato i cinque SQL originali delle migrazioni Supabase nell'ordine e con digest censiti in [Inventario SQL](FAMILY_MIGRATIONS_INVENTORY.md).
5. Verificare policy, privilegi, RPC, test con due nuclei e utenti sintetici su database isolato.
6. Definire release tag, manuale deploy, callback Auth, segreti e processo di rollback.
7. Creare una copia esportabile/archivio cifrato controllato dal proprietario; evitare di includere DB, utenti tester, email o password.

## 4. Criteri di chiusura

- [ ] Repository privato creato e visibilità **verificata dal connettore**.
- [ ] Importati 16/16 file, checksum o confronto contenuto, e lockfile.
- [ ] Build di produzione generata senza AppDeploy.
- [ ] Cinque migrazioni custodite privatamente, ricostruzione su database vuoto.
- [ ] Test di login, inviti, revoca, scadenze e doppio pagamento in ambiente separato.
- [ ] Nessun segreto in client/repo e nessun dato utente pubblicato.
- [ ] Procedure di ripristino e cessione documentate.

**Non dichiarare Family autonomo o legalmente cedibile finché tutti i criteri non sono superati.**
