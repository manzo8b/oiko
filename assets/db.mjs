const DB_NAME='oiko-local-v1', DB_VERSION=1;
export function openDatabase(){return new Promise((resolve,reject)=>{
 if(!('indexedDB' in window)){reject(new Error('IndexedDB non disponibile in questo browser'));return;}
 const req=indexedDB.open(DB_NAME,DB_VERSION);
 req.onupgradeneeded=()=>{const db=req.result;for(const name of ['expenses','bills','attachments','preferences'])if(!db.objectStoreNames.contains(name))db.createObjectStore(name,{keyPath:'id'});};
 req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('Impossibile aprire il database'));
 req.onblocked=()=>reject(new Error('Database bloccato da un’altra scheda aperta'));
 });}
export function dbGetAll(db,store){return new Promise((resolve,reject)=>{const tx=db.transaction(store,'readonly'),req=tx.objectStore(store).getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export function dbGet(db,store,id){return new Promise((resolve,reject)=>{const req=db.transaction(store,'readonly').objectStore(store).get(id);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export function dbPut(db,store,item){return new Promise((resolve,reject)=>{const tx=db.transaction(store,'readwrite');tx.objectStore(store).put(item);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Salvataggio annullato'));});}
export function dbDelete(db,store,id){return new Promise((resolve,reject)=>{const tx=db.transaction(store,'readwrite');tx.objectStore(store).delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Eliminazione annullata'));});}
export function atomicSavePayment(db,expense,updatedBill,attachment){return new Promise((resolve,reject)=>{
 const tx=db.transaction(['expenses','bills','attachments'],'readwrite');tx.objectStore('expenses').put(expense);if(updatedBill)tx.objectStore('bills').put(updatedBill);if(attachment)tx.objectStore('attachments').put(attachment);
 tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error('Errore nel salvataggio'));tx.onabort=()=>reject(tx.error||new Error('Operazione annullata'));
 });}
export function deleteExpense(db,id,attachmentId){return new Promise((resolve,reject)=>{const tx=db.transaction(['expenses','attachments'],'readwrite');tx.objectStore('expenses').delete(id);if(attachmentId)tx.objectStore('attachments').delete(attachmentId);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
export function replaceAllData(db,data){return new Promise((resolve,reject)=>{
 const names=['expenses','bills','attachments','preferences'];const tx=db.transaction(names,'readwrite');for(const n of names)tx.objectStore(n).clear();for(const n of names)for(const item of data[n]||[])tx.objectStore(n).put(item);
 tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error('Ripristino non riuscito'));tx.onabort=()=>reject(tx.error||new Error('Ripristino annullato'));
 });}
