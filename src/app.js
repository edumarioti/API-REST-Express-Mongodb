import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("erro", console.log.bind(console, "Erro de conexão"));
db.once("open", () => console.log("Conexão com o banco estabelacida"));

const app = express();

routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);


export default app;