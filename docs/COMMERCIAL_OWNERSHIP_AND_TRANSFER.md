# Oiko — Governance, commercializzazione e cedibilità

**Data verifica:** 27 ottobre 2026  
**Stato:** documento tecnico-operativo di preparazione, NON certificazione legale o autorizzazione alla vendita.

## 1. Decisione di prodotto

**Un solo prodotto e due modalità:**

- **Oiko**: versione locale, gratuita, utilizzabile senza registrazione, con dati finanziari in IndexedDB sul dispositivo. La promessa sulla privacy vale solo per questa modalità.
- **Oiko Family**: modalità condivisa con due account personali e dati in Supabase; beta privata. Registrazione pubblica e pagamento non abilitati.

Non migrano dati locali nel cloud senza un'azione dedicata, informata e verificabile. I dati locali non sono inclusi nei backup Supabase.

## 2. Asset censiti e ciò che NON si può presumere

| Asset | Stato verificato | Requisito prima della vendita/cessione |
| --- | --- | --- |
| Codice | Repository GitHub `manzo8b/oiko`, pubblico, branch `main`, GitHub Pages attivo | Inventario titolarità, autori, dipendenze e licenze, release e cronologia trasferibili |
| Licenza | Nessuna licenza dichiarata dall'API GitHub; assente file LICENSE nella radice esaminata | Decidere proprietà intellettuale, diritto di modifica/distribuzione e strategia repository. Pubblico ≠ automaticamente open source |
| Cloud Family | Progetto Supabase `Oiko`, regione `eu-west-1` (Irlanda), sano alla verifica | Conservare configurazioni/migrazioni, controlli accesso, recovery, riserva chiavi e procedure di handover |
| Frontend Family | Staging AppDeploy `oiko-family-staging-wanqjz` | Fonte versionata con lockfile, ambiente produzione separato, dominio e hosting contrattualmente idonei |
| Dominio | GitHub Pages di prova `https://manzo8b.github.io/oiko/` | Dominio commerciale registrato e controllato dal titolare da definire |
| Marchio e design | Identità Oiko viola/navy/giallo e logo | Ricerca di anteriorità e disponibilità marchio/nome, verifica titolarità degli asset |
| Titolare legale, contatto assistenza e soggetto di fatturazione | **Non definiti/verificati** | Identificazione e documentazione prima dell'accettazione di clienti paganti |

Non riportare chiavi segrete, backup utente, token di recupero, email dei tester o password nei repository e nei report.

## 3. Hosting: requisito contrattuale

GitHub Pages è utile per il prototipo pubblico e come vetrina, **non come hosting del SaaS commerciale Oiko Family**. La documentazione GitHub vieta espressamente l'utilizzo di Pages come hosting gratuito per un'attività commerciale online, e-commerce o SaaS:

- https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

Architettura obiettivo, **non ancora attivata**:

1. Repository sorgente sotto controllo del titolare, con versioni firmate/taggate e workflow QA.
2. Dominio commerciale proprietario su hosting che ammette commercializzazione, autenticazione e modalità SaaS secondo contratto (da selezionare).
3. Due percorsi coerenti su uno stesso dominio: Oiko locale e Oiko Family; la prima modalità mantiene dati nel browser e nessun obbligo di account.
4. Frontend Family collegato a un **progetto Supabase di produzione separato** da staging; migrazioni, segreti e configurazioni riproducibili.
5. Provider pagamenti futuro con autorizzazioni, imposte, rimborsi e webhook: nessun incasso avviato finché i gate non sono chiusi.
6. GitHub Pages resta temporaneamente ambiente dimostrativo della modalità locale e collegamento alla beta Family; non attivare checkout o abbonamenti su Pages.

Lo spostamento frontend o del dominio richiede prova di accesso, callback Auth/recovery, redirect e autorizzazioni CORS. Non cambiare URL Auth Supabase senza pianificare il collaudo.

## 4. GDPR: ruoli, informative, trattamento

Il titolare del trattamento per i dati Oiko Family deve essere identificato legalmente. Secondo il DPA Supabase, in uno scenario ordinario il cliente Supabase opera come controller/titolare e Supabase come processor/responsabile (salve differenti strutture contrattuali). **La sola regione Irlanda non certifica conformità GDPR**: verificare sub-responsabili, log, invii email, trasferimenti e misure di sicurezza.

Prima di iscrizioni pubbliche occorrono:

- Informativa Art. 13 GDPR con denominazione, contatti, finalità, basi giuridiche, categorie di dati, destinatari e fornitori, conservazione, diritti e trasferimenti.
- DPA Supabase e verifica DPA di hosting, SMTP, email transazionali, analytics (se presenti), pagamento e assistenza.
- Registro/documentazione del trattamento e valutazione proporzionata dei rischi; DPIA solo se richiesta dalla natura dei trattamenti.
- Funzioni affidabili per accesso, download, rettifica, cancellazione account e dati del nucleo, conservazione e gestione delle richieste; audit delle operazioni.
- Gestione incidenti, data breach e procedure di risposta.
- Politica cookie/tracciatori basata su ciò che viene **effettivamente** implementato; non inserire banner fittizi.
- Valutare separatamente la modalità locale, dove i dati finanziari non sono comunicati a Oiko, e la modalità Family cloud.
- Per una **cessione con trasferimento dei dati degli utenti**, analisi giuridica specifica, trasparenza, eventuali comunicazioni/consensi pertinenti e accordi tra venditore e acquirente: il trasferimento di proprietà del progetto **non equivale** automaticamente a trasferimento lecito di ogni informazione personale.

Fonti:
- https://supabase.com/legal/customer-resources/data-processing-addendum
- https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq
- https://www.garanteprivacy.it/home/principi-fondamentali-del-trattamento

## 5. Supabase: gestione e potenziale passaggio a terzi

- Supabase `Oiko` ora è nella regione `eu-west-1` ed è riservato al progetto Oiko.
- L'organizzazione/progetto dovrebbero avere ruoli di Owner e accessi documentati, con principio del privilegio minimo e controllo 2FA dei responsabili.
- Supabase **consente il trasferimento del progetto tra organizzazioni**, con requisiti e limitazioni: Owner dell'organizzazione sorgente, membro della destinazione e altre condizioni. Non trasferire né cancellare finché il contratto e l'handover non sono pronti. https://supabase.com/docs/guides/platform/project-transfer
- Definire esportazione delle migrazioni, struttura RLS, procedure Auth, SMTP, DNS, credenziali, segreti/rotazione, procedure import/export e prove di restore.
- Configurare backup di produzione con RPO/RTO documentati e test di ripristino. L'esportazione dati scaricabile dall'utente **non è un backup tecnico del database**.
- Attivare la protezione contro password compromesse, SMTP personalizzato, recupero password reale, gestione sessioni, cancellazione e test privacy; la beta non è ancora pronta a clienti esterni.
- Isolare ambienti di prova e produzione e vietare dati personali reali in test non necessari.

## 6. Modelli commerciali diversi

**A. Oiko Family in abbonamento o altro corrispettivo**  
Serve soggetto venditore identificato, condizioni contrattuali consumer (durata, prezzo, rinnovo, recesso/rimborsi, aggiornamenti, supporto), fatturazione/IVA e provider pagamenti. Consultare professionista legale e commercialista, tenendo conto dei Paesi di vendita.

**B. Cessione del codice o dell'intero progetto**  
Serve contratto con perimetro esplicito: codice, proprietà intellettuale, asset grafici, marchio, dominio, repository, infrastruttura, dati trasferibili, licenze terze, documentazione, passaggio credenziali e responsabilità. Il trasferimento di un progetto Supabase non determina da solo la cessione dei diritti sul software né la liceità del trasferimento dei dati.

**C. Licenza commerciale del software a un cliente/azienda**  
Definire perimetro della licenza, accesso al sorgente, gestione/hosting, manutenzione, requisiti privacy (chi è controller/processor) e separazione degli ambienti.

## 7. Gate di rilascio e passaggio di consegne

| Priorità | Decisione / evidenza | Stato |
| --- | --- | --- |
| P0 | Identità del titolare e del venditore | Da definire |
| P0 | Hosting commerciale conforme a condizioni di utilizzo | Da selezionare |
| P0 | Regime della proprietà intellettuale/licenze e inventario terze parti | Da verificare |
| P0 | DPA, privacy policy, termini e contatti | Da redigere e validare |
| P0 | SMTP, reset account, password compromesse | Da completare |
| P0 | Backup automatici, recovery e test restore | Da completare |
| P0 | Cancellazione account/nucleo e diritto di accesso | Da implementare/testare |
| P1 | Progetto Supabase produzione separato | Da predisporre |
| P1 | Dominio, DNS, CI/CD, monitoraggio, handover | Da predisporre |
| P1 | Test e-commerce, entitlement e assistenza | Da progettare |
| P1 | Due famiglie indipendenti con reali account distinti | Da collaudare |
| P1 | Stress test e test con migliaia di movimenti | Da collaudare |

**Nessun pagamento reale, vendita o trasferimento di dati personali finché i gate P0 non sono chiusi.**

Questo documento è uno strumento di preparazione tecnica e due diligence, non parere legale o fiscale. È richiesta revisione professionale prima del lancio.
