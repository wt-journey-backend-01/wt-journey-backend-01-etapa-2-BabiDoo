import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.port || 3000;
app.use(express.json());

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));