import express from 'express';
import { propertiesRouter } from './src/features/properties/properties-router';
import { componentsRouter } from './src/features/components/components-router';
import { authRouter } from './src/features/auth/auth-router';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const allowedOrigins = ['http://localhost:5173'];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use('/api/components', componentsRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on port ' + PORT));
