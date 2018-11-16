import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';

PouchDB.plugin(PouchdbFind);
const db = new PouchDB('contatos');
db.createIndex({
    index: { fields: ['nome'] }
});

export const URL_COUCH_DB = 'COLOQUE_AQUI_A_URL_DO_SEU_BANCO_DE_DADOS';

export default db;