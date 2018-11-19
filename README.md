# exemplo-pouchdb
Exemplo de PWA utilizando PouchDB para manter dados offline

# Executando o exemplo
* Após clonar o projeto, entre na pasta dele e digite o comando:
```console
$ npm i
```
* Para executar o exemplo, execute o comando:
```console
$ npm start
```
* Para habilitar a sincronização com o seu banco de dados no CouchDB disponível em algum serviço de nuvem (por exemplo, o [IBM Cloudant](https://console.bluemix.net/catalog/services/cloudant)), altere o valor da constante **URL_COUCH_DB** do arquivo *src/utils/pouchUtils.js*:
```javascript
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';

PouchDB.plugin(PouchdbFind);
const db = new PouchDB('contatos');
db.createIndex({
    index: { fields: ['nome'] }
});

export const URL_COUCH_DB = 'COLOQUE_AQUI_A_URL_DO_SEU_BANCO_DE_DADOS';

export default db;
```
