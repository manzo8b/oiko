# Oiko Family — Piano di produzione e passaggio di consegne

**Versione:** 1.0 — 27 ottobre 2026  
**Stato:** piano eseguibile a decisioni approvate, **NON una migrazione già eseguita**.  
**Vincoli:** preservare Oiko gratuito locale, accesso ai tester, dati e storico; niente vendite prima dei controlli.

## 1. Stato iniziale verificato

- **Oiko locale:** repository pubblico `manzo8b/oiko`, sito di prova GitHub Pages, IndexedDB senza account.
- **Oiko Family:** React/Vite/TypeScript in AppDeploy staging, Supabase Oiko `eu-west-1`, autenticazione email/password e RLS.
- **Backend Family:** sei tabelle applicative con RLS, RPC per invito/adesione, creazione spese/bollette/pagamenti, revoca.
- **Test manuali:** due adulti, revoca e reinvito, registrazione unica della bolletta pagata su due dispositivi.
- **Non ancora pronti:** SMTP commerciale verificato, protezione password compromesse, backup e restore di produzione, privacy e contratti, cessione tecnica completa, pagamenti.
- **Non presumere che lo staging sia un servizio commerciale né che GitHub Pages sia hosting per SaaS.**

## 2. Architettura di arrivo

```text
Dominio proprio e hosting contrattualmente idoneo
│
├── /            → Oiko, locale, IndexedDB e senza account
└── /family/     → Oiko Family, due utenti autenticati
                         │
                         └── Supabase PRODUCTION (progetto separato)
                             ├── Postgres/RLS/RPC
                             ├── Auth e recovery con SMTP
                             ├── backup + test restore
                             └── controllo accesso e monitoraggio

Staging: app Family e progetto Supabase già esistente
Codice sorgente: GitHub + archivio Family riproducibile, controllato dal titolare
```

Il dominio e l'hosting commerciale sono ancora **DA SELEZIONARE**, non indovinare provider, piani o prezzi. Evitare di spostare Family su GitHub Pages per usarlo come SaaS a pagamento: https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features

## 3. Fasi operative con criteri di accettazione

### P0 — Custodia del sorgente e proprietà

- [ ] Scegliere titolare e modello di commercializzazione/licenza/cessione.
- [ ] Decidere espressamente se la sorgente Family resta proprietaria e se creare repository privato.
- [ ] Esportare **tutti** i file sorgente AppDeploy Family, configurazione Vite, asset, test e dipendenze verso archivio/repository controllato. Il solo URL staging non è sufficiente per vendere il software.
- [ ] Eliminare chiavi hardcoded dalla distribuzione riproducibile dove opportuno; tenere soltanto public/publishable key nel frontend, segreti server fuori Git.
- [ ] Assicurare `package-lock.json` o altro lockfile e build deterministica; test su ambiente pulito senza AppDeploy.
- [ ] Salvare migrazioni Supabase sotto controllo versione e applicarle ad un database nuovo vuoto; test RLS e RPC.

### P0 — Privacy, autenticazione e disponibilità

- [ ] Configurare Auth email confermata, redirect URL del dominio nuovo, dominio di invio e SMTP transazionale.
- [ ] Testare password dimenticata, cambio password, logout locale/globale, revoca membership con due browser.
- [ ] Attivare protezione contro password compromesse, verificando il successivo Security Advisor.
- [ ] Definire retentions e sviluppare cancellazione/chiusura del nucleo + procedure per richieste GDPR.
- [ ] Scegliere strategia backup; i backup giornalieri gestiti sono previsti sui piani Supabase Pro/Team/Enterprise, non vanno presunti sul Free; per eventuale Free occorre export tecnico off-site e verifica.
- [ ] Eseguire **restore** di backup in ambiente separato e misurare RPO/RTO; testare record e autorizzazioni prima di qualunque rilascio.
- [ ] Identificare titolare GDPR, DPA, subprocessor e testo informativa/contratti approvati.
- [ ] Non trasferire mai dati reali tra terzi per test di vendita/cessione.

### P1 — Ambiente di produzione

- [ ] Acquistare/controllare un dominio e definire provider hosting con uso commerciale consentito.
- [ ] Creare **nuovo progetto Supabase di produzione** in organizzazione intestata al soggetto giusto; approvare eventuali costi prima della creazione.
- [ ] Applicare migrazioni, controllare grant, RLS, RPC, indici e policies; nessuna copia dei due utenti tester in produzione.
- [ ] Configurare redirect URL, scadenza sessioni, inviti e CORS; fare E2E con due nuovi account sintetici di produzione di prova e un terzo nucleo.
- [ ] Impostare CI/CD, dominio/SSL, logging prudente, alert, rollback e pagina stato.
- [ ] Presentare nel prodotto accesso, privacy, condizioni, supporto, cancellazione e percorso copia dati con linguaggio non tecnico.

### P1 — Collaudo e lancio controllato

- [ ] Test concorrenza reale sotto carico, tenuta di migliaia di movimenti e budget.
- [ ] Test isolamento fra due diversi nuclei con tre o più utenti sintetici.
- [ ] Simulare perdita credenziali e restore dell'ambiente, non soltanto export JSON.
- [ ] Validare pagamento/entitlement e revoca dopo scadenza, **solo dopo** approvazione prezzo/condizioni/operatore.
- [ ] Approvazione formale di tecnico, business owner, revisore legale e fiscale; checklist firmata.

## 4. Procedura di cessione, quando autorizzata

**Pre-handover:** accordo sul perimetro dei diritti, asset schedule, dati che possono essere trasferiti, autorizzazioni e costi; verifica licenze, privacy e catena di titolarità.

**Transizione:** amministrazione dominio/DNS, repository e CI/CD, hosting, app, account di service provider, documenti e supporto; Supabase ha una procedura ufficiale di `Project Transfers` tra organizzazioni con prerequisiti (owner org origine, membro org destinazione, integrazioni e ruoli compatibili): https://supabase.com/docs/guides/platform/project-transfer

**Sicurezza:** creare prima nuovi accessi dell'acquirente, poi ruotare password, API secret, chiavi critiche, webhook e credenziali. Il frontend pubblico può contenere soltanto credenziali publishable; non inserire segreti nei documenti di consegna.

**Privacy:** concordare passaggio dei contratti, esame di basi giuridiche e comunicazioni a utenti prima del trasferimento di dati. Nessuna esportazione database con dati degli utenti va resa pubblica.

**Verifica:** check DNS e OAuth/redirect, accesso Family, separazione RLS, pagamenti idempotenti, backup e restore, audit, alert, rollback. Firma accettazione al termine, non sulla semplice base del sito online.

## 5. Rischi e condizioni stop

| Rischio | Stop |
|---|---|
| Venditore/cliente controller non identificato | Non abilitare vendita o pubblico onboarding |
| Repository pubblico privo di licenza/chain-of-title | Non promettere esclusività o diritti di cessione non dimostrati |
| Family sorgente non trasferito fuori da AppDeploy | Non dichiarare software autonomamente riproducibile |
| SMTP o restore non testato | Non dichiarare produzione sicura/recuperabile |
| Storage locale confuso col cloud | Non migrare implicitamente i dati |
| Progetto staging utilizzato per produzione a pagamento | Non aprire sottoscrizioni |
| Hosting GitHub Pages utilizzato come SaaS commerciale | Migrare prima a hosting contrattualmente appropriato |

## 6. Evidenze da allegare in seguito

- Commit/tag release e output della suite QA.
- Inventario versionato migrazioni, funzione/procedura di ripristino, risultato Security Advisor.
- Test con account sintetici e seconda famiglia, log anonimi/aggregati.
- DPA e subprocessor confermati, informative e contratti legalmente revisionati.
- Verbale della prova di restore, RPO/RTO misurati e firma di accettazione.
- Checklist effettivo trasferimento asset con riferimenti ai contratti (non segreti).

**Fonti:** https://supabase.com/docs/guides/platform/project-transfer · https://supabase.com/docs/guides/platform/backups · https://supabase.com/legal/customer-resources/data-processing-addendum
