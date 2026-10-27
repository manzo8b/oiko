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


## Avanzamento tecnico — 27 ottobre 2026, fase commerciale 1

- **Implementato nello staging Supabase:** tabella privata `oiko_private.oiko_plan_entitlements` e RPC `public.oiko_family_plan_status(uuid)`; migrazione in `supabase/migrations/20261027134500_oiko_commercial_shadow_entitlements.sql`.
- **Isolamento e sicurezza verificati:** `authenticated` non possiede `SELECT/INSERT` sulla tabella amministrativa; RPC legge solo nuclei di cui l'identità autenticata è membro. `commercial_enabled` restituisce sempre `false`. Test transazionale senza modifiche agli utenti/spese.
- **UI staging:** Oiko Family mostra «Il tuo piano: Oiko Family — Beta privata» e l'assenza di pagamenti/abbonamenti attivi; AppDeploy ha confermato deployment `ready` senza errori iniziali.
- **Dati preesistenti salvaguardati:** 2 account, 2 membri attivi, 4 spese, 2 bollette; zero record commerciali/abbonamenti creati.
- **Advisor:** il warning `authenticated_security_definer_function_executable` sulla nuova RPC è una conseguenza dell'accesso tramite funzione privilegiata, limitato al nucleo con controllo `auth.uid()`. Va riesaminato prima del rilascio con audit indipendente; `auth_leaked_password_protection` resta disabilitato. La tabella privata non dispone volutamente di policy client. Non interpretare warning senza una review delle autorizzazioni.
- **Sorgente Family proprietario:** resta in AppDeploy; **non** è stato pubblicato nel repository Oiko aperto, né creato un repository privato. Prima del passaggio alla produzione occorre un repository privato controllato dal titolare, un archivio integrale dei sorgenti e una build autonoma con dipendenze bloccate.
- **Prossimo blocco di lavoro:** acquisizione sicura delle sorgenti e migrazioni storiche, SMTP e protezione password, backup con restore reale, dominio e hosting commerciale. Questa fase non attiva checkout, utenti pubblici né vendite.
