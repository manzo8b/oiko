# Oiko — Shortlist infrastruttura e costi del SaaS

**Data di ricognizione:** 27 ottobre 2026. **Valuta riferimenti USD**, con conversioni e IVA da verificare all'acquisto; nessun conto acquistato, nessuna attivazione.

## 1. Separare i due problemi

**Frontend e dominio:** l'hosting deve consentire un'applicazione commerciale, supportare HTTPS e dominio proprio, distribuire una build statica di Oiko e Family senza compromettere IndexedDB.

**Backend Family:** Supabase deve eseguire autenticazione, RLS, RPC, server-side entitlement, backup e controlli di sicurezza. Il progetto di prova esistente non va promosso a produzione senza ambiente separato.

## 2. Shortlist ragionata

| Servizio | Funzione candidata | Riferimento trovato | Limiti decisionali |
| --- | --- | --- | --- |
| **Cloudflare Pages** | Frontend statico, Git deploy e domini propri | Documentazione: Free fino a 500 build/mese e custom domains; listino Pages con opzione Free | **Candidato tecnico, non selezionato**. Verificare termini di servizio effettivamente applicabili al SaaS e politiche privacy prima di attivare |
| **Altro hosting commerciale statico** | Alternativa per distribuzione della medesima build | Preventivo/condizioni non ancora comparati | Confrontare costo, contatti titolare, SLA, log, trasferibilità, export, amministratori |
| **Supabase Pro** | Backend production consigliato come punto di partenza da quotare | Listino pubblicato da **25 USD/mese**, con primo progetto al compute base nei crediti inclusi, 7 giorni di backup giornalieri | Costi per progetti aggiuntivi, MAU oltre soglia, egress, storage, sicurezza, PITR e eventuali add-on; piano e organizzazione da approvare |
| **Servizio SMTP transazionale** | Password dimenticata, conferme, notifiche | Non selezionato né quotato | DPA, dominio mittente, DKIM/SPF/DMARC, rate limiting e recapito reale |
| **Provider pagamenti** | Abbonamenti e pagamenti, webhook e fatturazione | Non selezionato né quotato | Commissioni, rinnovi, contestazioni, fiscalità, recessi, integrazione nel backend |
| **Registrazione dominio** | Identità e trasferibilità dell'app | Non selezionato né quotato | Disponibilità marchio, titolarità, DNS e rinnovi |

**Non usare GitHub Pages per un SaaS commerciale:** i termini GitHub ne vietano esplicitamente l'uso come hosting gratuito del proprio business online o come servizio SaaS.

## 3. Dati di prezzo pubblici, non preventivi

- Supabase Pro: **a partire da $25/mese**; backup gestiti giornalieri mantenuti sette giorni nel piano Pro, secondo documentazione.
- Un ulteriore progetto Supabase può comportare circa **$10/mese in più per compute Micro** nella configurazione illustrativa del listino; l'effettivo addebito dipende da piano, organization e credits. Non sommare due volte i credits.
- Protezione password compromesse disponibile dal piano **Pro** in su.
- Cloudflare Pages ha un'opzione Free nei suoi listini pubblici; l'idoneità economica e giuridica **va verificata prima dell'uso commerciale**. Non trattare lo zero del frontend come costo totale del SaaS.

**Fonti primarie:**
- https://supabase.com/pricing
- https://supabase.com/docs/guides/platform/backups
- https://supabase.com/docs/guides/auth/password-security
- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://www.cloudflare.com/it-it/developer-platform/products/pages/
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## 4. Budget mensile e soglia di sostenibilità

`Costo operativo = backend database/auth + frontend/hosting + SMTP + dominio (quota mensile) + monitoraggio + backup add-on + commissioni incasso + gestione resi/contestazioni + assistenza + spese professionali e amministrative attribuibili`.

`Ricavo netto per nucleo = prezzo pagato − IVA e tributi riscossi da riversare − commissioni incasso − costi variabili per quel nucleo`.

`Nuclei per break-even di contribuzione = costi fissi mensili / margine netto per nucleo`; arrotondare all'intero superiore. Se il margine netto unitario è zero o negativo, la quota di abbonamenti non copre i costi fissi.

Le formule non costituiscono business plan completo: bisogna misurare conversione, churn, crescita, CAC, ticket supporto e riscossione reale. LTV e valutazione di cessione devono basarsi su dati documentati.

## 5. Decisione e cost cap

**Raccomandazione progettuale, non acquisto autorizzato:** valutare frontend statico su Cloudflare Pages e backend Supabase Pro per la prima produzione, con budget e limiti impostati. Conservare portabilità frontend e database, verificare termini e DPA.

- Nessuna sottoscrizione o progetto nuovo finché il soggetto legale non è identificato e gli eventuali costi non sono approvati.
- Nessuna pubblicazione di credenziali, export utenti o segreti nel repository pubblico.
- Nessun dato tester reale in una futura installazione production.
- Confrontare un'offerta alternativa prima della scelta definitiva e salvare l'evidenza dei costi.
