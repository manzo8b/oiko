# Oiko — Piano di esecuzione a due percorsi

**Approvazione direzione:** 27 ottobre 2026. **Status report:** niente vendita attiva; QA e staging conservati.

| Ordine | Pacchetto | Prova di completamento | Stato |
| --- | --- | --- | --- |
| 01 | Custodia Family fuori da AppDeploy | Repo privato, sorgenti e lockfile, build pulita | **APERTO** |
| 02 | Baseline SQL riproducibile | Migrazioni eseguibili da zero, RLS, RPC, test isolamento | **APERTO** |
| 03 | Titolare, IP e licenze | Chain-of-title e decisione licenza/venditore validate | **APERTO** |
| 04 | Sicurezza Auth | Recupero email funzionante, SMTP, password protection, sessioni | **APERTO** |
| 05 | Continuità e privacy | Backup automatico + restore, export/erasure, retention, DPA | **APERTO** |
| 06 | Ambiente production | Provider idoneo, dominio controllato, progetto Supabase isolato | **APERTO** |
| 07 | Licenza premium e UX | Entitlement server-side, scadenza senza perdita dei dati | **APERTO** |
| 08 | Billing e contratti | Prezzi approvati, IVA, pagamenti test, recesso, documenti legali | **APERTO** |
| 09 | Collaudo finale | 2 famiglie, 3+ utenti, pagamenti concorrenti, accessibilità, QA | **APERTO** |
| 10 | Apertura commerciale | Tutti i P0 verificati + attestazione approvazione release | **BLOCCATA** |
| 11 | Cessione/licenza B2B | Data room, contratto, IP, handover e test ripartenza | **FUTURO** |

## Criteri di gestione

Il file `config/release-gates.json` mantiene i gate critici con evidenze. `npm run release:check` informa senza bloccare i test di sviluppo; `npm run release:check:strict` restituisce errore finché non ci sono condizioni e approvazione commerciale. Non modificare gli stati in *verified* senza prove e responsabili effettivi.

La scelta del titolare legale e dell'entità che fattura **rimane aperta**; la scelta approvata riguarda invece entrambi i modelli di ricavo e futuro asset sale.

**Regola:** la beta può continuare ad essere sviluppata. L'apertura alle iscrizioni esterne e la vendita sono fermate fino ai gate. Non copiarvi credenziali o dati dei tester.
