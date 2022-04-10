import express from 'express';
import fetlockRoutes from './routes/fetlock';

const app = express();

app.use(express.json());
app.use(fetlockRoutes);

export default app;
