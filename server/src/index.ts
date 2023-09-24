import express from 'express';
import { createUser } from './routes/User/createUser';
import { createProduct } from './routes/Product/createProduct';
import { getProducts } from './routes/Product/getProducts';
import { createReview } from './routes/Review/createReview';
import { getReviews } from './routes/Review/getReviews';
import { getUser } from './routes/User/getUser';
import cors from 'cors';
import { getUserById } from './routes/User/getUserById';
import { getCount } from './controllers/Review/getCount';
import { CreateService } from './routes/Service/CreateService';
import { GetServices } from './routes/Service/GetServices';

const app = express();
const port = process.env.PORT || 3001;
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://127.0.0.1:3001',
  'http://localhost:3002',
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const router = express.Router();

// Middleware para las rutas bajo '/api/v1/'
router.use(express.json());
router.use(cors(options));

// user routes
router.post('/user/create', createUser);
router.post('/user/get', getUser);
router.post('/user/getById', getUserById);

// service routes
router.post('/service/create', CreateService);
router.post('/service/get', GetServices);

// review routes
router.post('/review/create', createReview);
router.post('/review/get', getReviews);
router.post('/review/getCount', getCount);

// Monta el enrutador bajo '/api/v1/'
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
