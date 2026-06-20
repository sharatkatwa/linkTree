import cookieParser from 'cookie-parser';
import e from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';

const app = e();

app.use(e.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);

app.use('/health', (req, res) => {
  res.status(200).json({ message: 'api is in good condition' });
});

export default app;
