# Oiko — Architettura SaaS vendibile e cedibile

**Stato:** progetto tecnico approvato come direzione, *nessuna istanza produzione o billing creati*.  
**Data:** 27 ottobre 2026.

## 1. Confini di produzione

```text
Dominio commerciale sotto controllo del titolare (da scegliere)
├── /             Oiko gratuito: browser + IndexedDB, nessuna autenticazione
└── /family/      Oiko Family frontend: utente autenticato
                     │
                     ├── Supabase PRODUCTION (da creare, separato da staging)
                     │   ├── auth.users, sessioni e email recovery
                     │   ├── households / memberships, RLS su tutti i nuclei
                     │   ├── expenses / bills / invites / activity events
                     │   └── entitlements / billing_events (PROPOSTI, NON ESISTENTI)
                     │
                     └── Provider pagamenti futuro → webhook server verificato
                                                           → entitlement
Staging attuale: AppDeploy Family + Supabase Oiko eu-west-1, solo due tester.
GitHub Pages: dimostrazione Oiko, NON hosting SaaS commerciale.
```

Il frontend Family attuale non è ancora archiviato in un repository sorgente privato autonomo; recuperare i file esistenti da AppDeploy e fare una build verificabile con lockfile, **senza pubblicarli nel repository statico aperto**.

## 2. Isolamento dei privilegi e flusso dati

- `auth.users`: identità verificata, nessuna password in tabelle di Oiko.
- `households` e `memberships`: persone che possono leggere/scrivere nel nucleo; RLS autenticata, controllo server per tutte le mutazioni.
- `bills/expenses`: idempotenza e blocchi SQL già verificati manualmente su due dispositivi; ulteriore test concorrente automatizzato richiesto.
- `entitlements` (da progettare): abilitazioni commerciali per nucleo. Non alterano né sostituiscono RLS o le membership.
- `billing_events` (da progettare): eventi di incasso lato server, con provider_event_id univoco e firma webhook.
- Nessun `service_role` o token segreto nelle pagine, in repository pubblico o nel browser.
- La futura importazione IndexedDB→Family non deve avvenire senza anteprima, consenso, idempotenza e rollback.

## 3. Diagramma logico dei dati commerciali (non migration SQL)

```text
households (attuale)
  ├── memberships (attuale)   → chi ha accesso
  ├── expenses / bills        → dati contabili
  └── entitlements (futuro)   → se il nucleo può usare funzioni premium
         └── billing_events (futuro) → attestazione del provider
```

La separazione evita di: concedere accesso a utenti revocati quando una sottoscrizione si rinnova; cancellare spese a seguito di chargeback; trattare un token del browser come prova di pagamento.

**Contratto funzionale per attivazione premium:** un evento `paid` o `trial` valido è riconosciuto dal backend, mai dal client; l'utente che tenta operazioni deve anche risultare membro attivo del nucleo. Le azioni di lettura/esportazione dopo scadenza andranno definite in funzione di privacy, contratti e gestione delle richieste degli interessati.

## 4. Ambienti e proprietà operativa

| Ambiente | Stato | Dati | Deployment |
| --- | --- | --- | --- |
| Oiko demo GitHub Pages | online | IndexedDB locali dell'utente | repository pubblico, v0.6.2 |
| Oiko Family staging | online, beta privata | test dei due utenti; dati minimizzati | AppDeploy + Supabase progetto Oiko |
| Oiko produzione | **non creato** | nessun account o dato reale finché non autorizzato | hosting commerciale, dominio di proprietà |
| Oiko Family produzione | **non creato** | progetto Supabase e SMTP isolati | build frontend indipendente + migrazioni e backup |

Non creare oggi un progetto Supabase produzione: servono prima organizzazione/titolare corretti, piano economico e accettazione degli eventuali costi.

## 5. Deploy riproducibile e handover

1. Inventariare sorgenti Family AppDeploy (TSX, CSS, config, test), hash, versioni e dipendenze; verificare eventuali diritti terzi.
2. Mettere Family in repository **privato** o archivio sorgente controllato, con `package-lock.json` e riproducibilità su macchina pulita; non affidarsi al solo snapshot cloud.
3. Versionare migrazioni SQL di `oiko_private`, RPC pubbliche, RLS, indici e grants, verificando comportamento con account fittizi di due famiglie.
4. Configurare file `.env.example` senza valori segreti, variabili dei domini e delle chiavi `publishable`; le chiavi admin solo nei segreti del backend.
5. Aggiungere script per build/test/preview/rollback con CI; nessuna pubblicazione automatica produzione da branch staging.
6. Stipulare hosting idoneo; usare un dominio controllato dal titolare e verificare TLS, DNS e callback Auth PKCE.
7. Effettuare recupero Auth via email, protezione delle password compromesse e prove di backup/restore isolate.
8. Eseguire collaudi con almeno due nuclei, carichi importanti, mobile e accessibilità.
9. Definire supporto, incident response, cancellazione, retention e contratti; solo allora sottoporre il rilascio alla checklist commerciale.

## 6. Sicurezza e backup

L'advisor Supabase rileva attualmente **leaked password protection disabilitata**. Questa funzionalità è disponibile sui piani Supabase **Pro e superiori**; non dichiararla attivata in Free. https://supabase.com/docs/guides/auth/password-security

I backup giornalieri gestiti Supabase riguardano i piani a pagamento. Prima del SaaS commerciale valutare policy, retention, disponibilità, test restore, RPO/RTO e politiche di conservazione; non confondere la funzione *Scarica una copia dei dati* dell'utente con un backup di intera piattaforma.

Documentazione trasferibilità progetto Supabase: https://supabase.com/docs/guides/platform/project-transfer

## 7. Vincoli di indipendenza dai fornitori

- Nessun deploy Family dipendente in modo esclusivo da un builder senza export verificato.
- Procedura di rotazione secret e cambio proprietà GitHub, dominio, hosting, pagamenti e Supabase.
- Directory documentale di handover con inventario degli asset, evidenze e stati dei contratti, non credenziali.
- Definire continuità operativa in caso di cambio fornitore o cessione.
- La titolarità delle informazioni personali non segue automaticamente il passaggio del codice.

Riferimento: [Piano di cessione e produzione](FAMILY_PRODUCTION_AND_TRANSFER_RUNBOOK.md).
