// TODO: Setup automation for deploy
import express from 'express';
import cors from 'cors';
import config from './config';
import apiRoutes from './controllers';
import dbConnect from './middleware/dbConnect';
import morgan from 'morgan';
import notFoundRoute from './middleware/notFoundRoute';
import setHeaders from './middleware/headerSetup';

const app = express();

app.use(cors());
app.use((req, res, next) => {
  setHeaders(req, res, next);
});
app.use(morgan('common'));

// Initialize Sequelize instant
app.use(dbConnect);
// Enable the json body request
app.use(express.json());

// home route
app.get('/', (req, res) => {
  try {
    res.status(200).json({
      app: config.APP_NAME,
      version: config.APP_VERSION
    });
  } catch (ex) {
    res.status(res.statusCode || 500).json({ error: ex.message });
  }
});

app.use('/api', apiRoutes);

app.use(notFoundRoute);

app.listen(config.PORT, () =>
  console.log(`APP is running on http://localhost:${config.PORT}/`)
);
