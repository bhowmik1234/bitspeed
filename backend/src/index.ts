import express from 'express';
import contactRoutes from './routes/contact.routes';
import { errorHandler } from "./utils/errorHandler";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());
app.use('/', contactRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
