import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';

PouchDB.plugin(PouchdbFind);
const db = new PouchDB('contatos');
db.createIndex({
    index: { fields: ['nome'] }
});

export const URL_COUCH_DB = 'https://478d7966-69ed-42ad-aedc-4f5ce52c1f86-bluemix.cloudant.com/agenda-prod';

export default db;