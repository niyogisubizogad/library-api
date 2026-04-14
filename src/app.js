import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
const app = express();


app.use(express.json())
app.use('/api/books', bookRoutes);


app.get('/test', (req, res) => {
  res.send('server works');
});

export default app;