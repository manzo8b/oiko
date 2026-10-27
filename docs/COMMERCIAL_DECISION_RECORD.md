# Oiko — Decisione societaria e modello di vendita

**Versione:** 1.0 — 27 ottobre 2026  
**Stato:** preparazione; decisione giuridica, fiscale e commerciale non ancora formalizzata.  
**Uso:** fascicolo di due diligence e decisioni, non consulenza legale o atto di cessione.

## 1. Decisione bloccante: chi vende e chi gestisce?

Alla data della ricognizione **non è stato identificato e verificato alcun soggetto giuridico** come venditore, licenziante o titolare del trattamento di Oiko Family. Non compilare informative, contratti o checkout con nominativi o partite IVA presunti.

| Percorso | Quando valutarlo | Decisioni e verifiche |
|---|---|---|
| **A — Attività individuale** | Avvio diretto di un piccolo servizio a clienti | Titolarità del codice, inquadramento fiscale/contributivo, responsabilità contrattuali, fatturazione, GDPR, separazione patrimonio |
| **B — Società esistente** | Operatività già organizzata, fatturazione e assistenza disponibili | Catena documentata di assegnazione/licenza del software e marchio alla società, amministratori/autorizzazioni, contabilità, contratti e privacy |
| **C — Nuova società** | Costruzione di un asset organizzato per investimento o cessione | Conferimento/licenza dei diritti, capitale/costi/adempimenti, persone responsabili, fiscalità e governance delle credenziali |
| **D — Cessione solo del software** | Non si vuole gestire direttamente un SaaS | Esatta identificazione dell'acquirente, elenco dei diritti trasferiti, documentazione, garanzie sul codice e dipendenze, nessun trasferimento automatico dei dati di persone fisiche |

**Da compilare dopo scelta esplicita (non pubblicare dati personali nel repository):**
- Opzione scelta: **DA DEFINIRE**.
- Venditore / concedente licenza: **DA DEFINIRE**.
- Eventuale società gestore del SaaS: **DA DEFINIRE**.
- Titolare del trattamento di Oiko Family: **DA DEFINIRE**.
- Giurisdizione, mercati di destinazione e struttura IVA: **DA DEFINIRE**.
- Contatto legale e contatto supporto: **DA DEFINIRE**.
- Perimetro di un'eventuale cessione: **DA DEFINIRE**.

## 2. Tre operazioni differenti: non confonderle

**Vendita del servizio Oiko Family a utenti finali** — il gestore continua a essere responsabile del servizio, dei contratti, di privacy e sicurezza. Occorrono condizioni consumer, prezzi comprensivi di imposte, regole di durata/rinnovo, eventuale recesso e conferma dell'ordine, supporto, informazioni su funzionalità/compatibilità, accessibilità e fatturazione. Revisione legale e fiscale prima dell'attivazione.

**Licenza del software a un'altra impresa** — definire se l'impresa riceve codice sorgente, marchio, deployment autonomo, aggiornamenti e assistenza; individuare separatamente i ruoli privacy per ciascuna istanza.

**Cessione di asset o dell'intero progetto** — inventariare sorgenti, diritti d'autore, loghi, dipendenze e licenze, dominio, repository, infrastrutture, costi ricorrenti, rapporti contrattuali, backup, supporto e garanzie; trasferimenti di account e dati personali richiedono basi e procedure proprie. Una cessione del progetto Supabase non cede automaticamente IP, dominio o dati.

## 3. Inventario di proprietà intellettuale e controllo tecnico

| Asset | Stato al 27-10-2026 | Prima della cessione |
|---|---|---|
| Repository `manzo8b/oiko` | **Pubblico**, GitHub Pages attivo, licenza software non dichiarata all'API | Verificare autori, diritti e licenze di terzi; decidere modello di distribuzione. Una copia passata del codice pubblico non si può rendere retroattivamente segreta |
| Codice Oiko locale | Versionato nel repository, archiviazione IndexedDB | Inventario dei moduli, test, dipendenze, dati-demo, versioni e istruzioni di build |
| Codice Oiko Family | Attualmente conservato come sorgenti frontend nello staging AppDeploy | Effettuare una **esportazione sorgenti riproducibile** verso repository controllato, preferibilmente privato se si decide una licenza proprietaria. Configurazione di build, dipendenze bloccate e test associati |
| Backend Family | Database e funzioni Supabase; quattro migrazioni già applicate nello staging | Portare le migrazioni SQL e le policy RLS sotto versione; ripristinare in progetto pulito e validare |
| Logo, font, icone e grafiche | Brand Oiko coerente, origine/diritti da documentare | Prove di titolarità e licenze di ogni componente (inclusi eventuali asset generati con AI) |
| Nome e marchio Oiko | Nessuna clearance sul marchio certificata | Ricerca di anteriorità, nomi di dominio, eventuale registrazione |
| Account amministrativi, DNS e log | Attualmente collegati ad ambienti di sviluppo | Controllo degli accessi, multi-fattore, titolarità del dominio, supporto ed escrows se necessari |
| Dati di test | Due account Family; spese e bollette fittizie | **Non inserire** esportazioni, credenziali e backup contenenti persone reali nel repository pubblico |

Un repository pubblico senza file LICENSE non autorizza a presumere una licenza open source né prova da solo una catena di titolarità esclusiva. La documentazione contrattuale di un progetto creato anche con strumenti AI dovrà indicare con precisione autori, contributi e asset di terzi.

## 4. Registro delle decisioni e approvazioni

| Decisione | Responsabilità | Stato |
|---|---|---|
| Scegliere l'opzione A / B / C / D | Proprietario del progetto | **APERTA** |
| Identificare il soggetto venditore e, se diverso, gestore | Proprietario + consulente fiscale | **APERTA** |
| Formalizzare chain-of-title, licenze e marchio | Legale specializzato in IP/IT | **APERTA** |
| Definire tipo di contratto (servizio, licenza, asset sale) | Proprietario + legale | **APERTA** |
| Verificare base giuridica e ruoli GDPR | Titolare designato + privacy specialist | **APERTA** |
| Scegliere hosting commerciale e dominio | Responsabile tecnico + titolare | **APERTA** |
| Pianificare migrazione staging→produzione | Responsabile tecnico | **PRONTA DA PROGETTARE, NON ESEGUITA** |
| Abilitare checkout e vendite | Solo dopo completamento dei gate | **VIETATO NELLA BETA** |

## 5. Fonti ufficiali da utilizzare nelle revisioni

- Vendite a distanza e informazioni precontrattuali UE: https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm
- DPA Supabase, incluse le possibili funzioni controller/processor: https://supabase.com/legal/customer-resources/data-processing-addendum
- Trasferimento tra organizzazioni Supabase: https://supabase.com/docs/guides/platform/project-transfer
- Restrizioni GitHub Pages sull'hosting di servizi SaaS: https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features

**Nota:** le informazioni ufficiali non sostituiscono il parere di un avvocato e di un commercialista per il caso concreto.
