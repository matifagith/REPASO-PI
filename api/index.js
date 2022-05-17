const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {apiEpisodesToDb} = require ('./src/routes/controllers/controllers.js')

// Syncing all the models at once.

// Para la precarga cuando se levanta el server, ejecutar la funcion apiEpisodesToDb(). Al ser una peticion vamos a usar async await.

conn.sync({ force: true }).then(() => {
  apiEpisodesToDb();
  server.listen(3001, () => {
    console.log("Listening at 3001"); // eslint-disable-line no-console
  });
});
