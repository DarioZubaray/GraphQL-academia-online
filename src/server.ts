import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
app.use('*', cors());
app.use(compression());

app.get('/', (req, res) => {
    res.send("Bienvenidos a la academia online");
});

const httpServer = createServer(app);

const PORT = 5300;
httpServer.listen(
    {
        port: PORT
    },
    () => console.log(`Hola juli desde http://localhost:${PORT}`)
);