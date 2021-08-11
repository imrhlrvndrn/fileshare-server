import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// config
import { connectDB, PORT } from './config';

// importing routes
import { fileRoutes } from './routes';

// importing middlwares
import { errorHandler } from './middlewares';
import { Cloudinary } from './services';

Cloudinary.configure();
dotenv.config();
const app = express();

(async () => {
    await connectDB();
})();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/api/files', fileRoutes);
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' }).end();
});
// error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
