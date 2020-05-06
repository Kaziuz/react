## reduxcrud
Este proyecto usa un fake server [json-server](https://my-json-server.typicode.com/).

npm install -g json-server
Para correr es necesario en consola:

estar ubicado donde este la base de datos y luego:
json-server --watch nombrebasededatps --port 5000
json-server --watch productos.json --port 5000

para correr el fronted
npm install
npm start

Este proyecto usa get, post, put y delete para hacer los respectivo cambios
en la vista usando axios para realizar los querys a la api