# Oiko — Piano di esecuzione a due percorsi

**Approvazione direzione:** 27 ottobre 2026. **Status report:** niente vendita attiva; QA e staging conservati.

| Ordine | Pacchetto | Prova di completamento | Stato |
| --- | --- | --- | --- |
| 01 | Custodia Family fuori da AppDeploy | Repo privato, 16 sorgenti, 5 SQL originali, lockfile, `npm ci`, test e build su GitHub | **COMPLETATO (packaging frontend)** |
| 02 | Baseline SQL riproducibile | 6 SQL originali e replay su Postgres isolato, prove con Auth e REST locali superate; resta hosted Supabase | **IN CORSO — baseline locale verificata** |
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


## Avanzamento tecnico — 27 ottobre 2026, fase commerciale 1

- **Implementato nello staging Supabase:** tabella privata `oiko_private.oiko_plan_entitlements` e RPC `public.oiko_family_plan_status(uuid)`; migrazione in `supabase/migrations/20261027134500_oiko_commercial_shadow_entitlements.sql`.
- **Isolamento e sicurezza verificati:** `authenticated` non possiede `SELECT/INSERT` sulla tabella amministrativa; RPC legge solo nuclei di cui l'identità autenticata è membro. `commercial_enabled` restituisce sempre `false`. Test transazionale senza modifiche agli utenti/spese.
- **UI staging:** Oiko Family mostra «Il tuo piano: Oiko Family — Beta privata» e l'assenza di pagamenti/abbonamenti attivi; AppDeploy ha confermato deployment `ready` senza errori iniziali.
- **Dati preesistenti salvaguardati:** 2 account, 2 membri attivi, 4 spese, 2 bollette; zero record commerciali/abbonamenti creati.
- **Advisor:** il warning `authenticated_security_definer_function_executable` sulla nuova RPC è una conseguenza dell'accesso tramite funzione privilegiata, limitato al nucleo con controllo `auth.uid()`. Va riesaminato prima del rilascio con audit indipendente; `auth_leaked_password_protection` resta disabilitato. La tabella privata non dispone volutamente di policy client. Non interpretare warning senza una review delle autorizzazioni.
- **Sorgente Family proprietario:** resta in AppDeploy; **non** è stato pubblicato nel repository Oiko aperto, né creato un repository privato. Prima del passaggio alla produzione occorre un repository privato controllato dal titolare, un archivio integrale dei sorgenti e una build autonoma con dipendenze bloccate.
- **Prossimo blocco di lavoro:** acquisizione sicura delle sorgenti e migrazioni storiche, SMTP e protezione password, backup con restore reale, dominio e hosting commerciale. Questa fase non attiva checkout, utenti pubblici né vendite.


## Avanzamento — custodia sorgenti e dipendenze completata, 27 ottobre 2026

Il repository privato [manzo8b/oiko-family-private](https://github.com/manzo8b/oiko-family-private) ora contiene 16/16 sorgenti dello snapshot Family, `package-lock.json` (199 voci), 5/5 migrazioni originali e una pipeline di build/test GitHub Actions. La compilazione indipendente è passata: [evidenza CI](https://github.com/manzo8b/oiko-family-private/actions/runs/40512028821). **Non equiparare questa prova di build al collaudo runtime in produzione**. Prossimo passaggio: schema completo da ricreare in Supabase isolato e test Auth/RLS, senza toccare i due utenti della beta.


## Collaudo incrementale — 27 ottobre 2026 (replay + Auth REST + DR)

**Controlli passati in GitHub Actions su ambienti temporanei, non sul servizio dei tester:**

- `Oiko Family isolated DB`: 6 migrazioni applicate su PostgreSQL 16 vuoto, due nuclei/five utenti sintetici, autorizzazioni RLS/RPC, idempotenza e invito/revoca/reinvito.
- Concorrenza reale con due connessioni PostgreSQL indipendenti: **un pagamento registrato, uno rifiutato, nessun doppione**. [Evidenza](https://github.com/manzo8b/oiko-family-private/actions/runs/40525888049).
- `Oiko Family full local Supabase Auth + REST`: cinque sessioni Auth reali, PostgREST, inviti, due famiglie, isolamento, piano Family beta e recupero email richiesto. [Evidenza](https://github.com/manzo8b/oiko-family-private/actions/runs/40525363048).
- Consegna **locale** dell'email di recupero a Mailpit, senza alcuna email inviata all'esterno. [Evidenza](https://github.com/manzo8b/oiko-family-private/actions/runs/40526380234).
- Dump e ripristino PostgreSQL **con soli dati inventati** in un secondo DB temporaneo, confronto di spese, membri, bollette e verifica RLS/RPC. [Evidenza](https://github.com/manzo8b/oiko-family-private/actions/runs/40526710632).

**Limiti da non superare a parole:** questo non costituisce restore di backup gestiti dal cloud Supabase, test del fornitore SMTP commerciale, test browser/mobile della build privata, pen-test o test di carico esteso. Non è stato creato un nuovo progetto Supabase e la beta dei tester resta invariata.

**Gate commerciale:** tutti i requisiti critici rimangono aperti, `market_release_allowed=false`; nessuna attivazione di checkout, iscrizioni pubbliche o incassi.
