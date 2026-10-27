# Oiko — Product architecture and commercial release gates

**Decision date:** 2026-10-27  
**Status:** Architecture implemented, commercial readiness not yet approved

## One product, two access modes

| Aspect | Oiko (without account) | Oiko Family (authenticated) |
| --- | --- | --- |
| Entry | Same Oiko brand and primary site | Family section of Oiko, opening separate private staging |
| Account | Never required | Two adult identities with distinct credentials |
| Storage | Browser IndexedDB, no sync | Supabase Postgres scoped to household |
| Payments | Record paid expenses; no financial transactions | Shared recording of payments; no financial transactions |
| Current state | Usable | Private beta |

Oiko's primary entry is **https://manzo8b.github.io/oiko/**.
Private Family staging currently operates at **https://oiko-family-staging-wanqjz.v2.appdeploy.ai/**. The staging URL is internet-accessible, but account registration is disabled and access is restricted to approved testers. This URL is not yet the public sales destination.

**Do not imply** that opening Oiko Family automatically migrates IndexedDB data, synchronizes Oiko Solo, or upgrades an existing local archive. There is no automatic migration, cloud backup of local data, billing system, or commercial subscription in this release.

## UX principles

- The approved purple/navy/yellow palette v0.5 is the shared brand across both experiences.
- Preserve a single Oiko voice and clear route back to local Oiko.
- Keep the 5-tab mobile navigation unchanged for the local app.
- Family dashboard prioritizes month spending, open payments, overdue amounts, member activity, transparent categories and trends.
- Every amount must reflect actual known records, with due/paid always distinguished; overdue may be a subset of open.
- Clear empty states, meaningful confirmations, accessible forms, error recovery, and no obstructive floating controls.
- Never show fake bank balances or fictitious projected budgets.

## Architecture boundaries

- Keep local storage names, backup JSON schema and attachment handling unchanged.
- Use only publishable Supabase credentials in web clients; secret and service-role keys remain exclusively server-side.
- Family tables must use tenant-scoped RLS, backed by verified session identity.
- Invites are one-time, email-bound and expire; perform independent cross-household access tests.
- Confirming bills must remain atomic and idempotent for the same occurrence.
- Family reporting currently reads the most recent 100 expenses and 100 bills; complete historical reporting/pagination is **required before release**.
- Revocation and recovery procedures must be tested on real devices.
- No external payment processor, login, or storage permission is needed for Oiko's local mode.

## Commercial launch gates

| Gate | Acceptance evidence | Current |
| --- | --- | --- |
| UX consistency | Mobile + desktop guided tests; accessibility and VoiceOver | In progress |
| Family workflows | 2 distinct accounts; shared expenses; single paid occurrence | Superati su due dispositivi |
| Tenant isolation | Authenticated attacker with separate household denied | Simulazione SQL con nucleo separato e RLS superata; E2E con terzo account ancora da effettuare |
| Concurrent payments | Two devices tap at the same time; one expense only | Test manuale su due dispositivi superato; stress test automatico ancora da effettuare |
| Account lifecycle | Invite, revoke, rejoin, recovery, session revocation | Invito→revoca→reinvito superato; cambio password e gestione sessioni pubblicati ma non testati; email recovery in attesa verifica SMTP |
| Reporting integrity | Correct totals with thousands of records and pagination | Paginazione implementata (limite esplicito 20.000/sezione); carico reale da provare |
| Data lifecycle | Export, migration local→Family, deletes, backup restoration | Esportazione JSON solo lettura pubblicata, non ancora collaudata; import e ripristino non presenti |
| Authentication hardening | Leaked-password checks, MFA/passkey plan, rate limits | Not complete |
| Privacy/compliance | Controller identification, GDPR assessment, notice, retention, DPA review | Not complete |
| Consumer sales | Price/renewal/recesso terms, Italian/EU VAT and OSS if applicable | Not complete |
| Payments and entitlement | Test checkout, webhooks, access after expired/cancelled plan | Not complete |
| Support and incident readiness | Contact, error monitoring, incident response, recovery procedure | Not complete |
| Branding/IP | Verify Oiko naming, domain and mark availability | Not complete |

**Rule: Do not enable paid subscriptions or advertise Family as fully available until every critical gate is accepted.** Commercial legal review should be performed by qualified counsel, and tax structure with a commercialista.

## Phase update — 27 October 2026

- Oiko Family staging aggiunge cambio password da sessione autenticata, logout locale/globale e chiusura delle altre sessioni dell'account. **Non ancora collaudati** su account tester.
- Richiesta recupero password via email predisposta: non dichiarare affidabile senza SMTP configurato, test di consegna email e verifica end-to-end link PKCE.
- Export manuale JSON dei dati del nucleo (spese, bollette, membri e audit) protetto da RLS e richiesta di appartenenza attiva. File non cifrato e da proteggere; funzione di import/ripristino non prevista in questa versione.
- Backup server gestiti da Supabase e prova di restore richiesti prima della vendita: i piani Pro/Team/Enterprise prevedono backup giornalieri; per piani gratuiti serve una soluzione off-site verificata. Non confondere export utente con backup del database.
- Supabase Security Advisor segnala ancora 'auth_leaked_password_protection' disabilitato: da risolvere prima del rilascio commerciale.
- Copie di test Family non vanno mai pubblicate nel repository GitHub pubblico.

## Next sprint (recommended)

1. Validate the Family authenticated dashboard with both real test accounts after this visual release.
2. Test revocation, token/session behavior, household isolation and concurrent payments.
3. Implement paginated reports and complete budget parity in Family.
4. Design deliberate local-to-cloud migration with read-only preview, audit trail, consent and rollback.
5. Establish terms, privacy governance and production infrastructure before testing pricing and billing.

