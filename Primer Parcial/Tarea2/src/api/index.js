const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const connectDB = require('./libs/mongoose');
const { logErrors,
  errorHandler,
  mongooseHandler,
  boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());

app.use(cors());

app.get('/api', (req, res) => {
  res.send('Express Server');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(mongooseHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/api`);
});

