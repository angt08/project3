const express = require('express');
const PORT = process.env.PORT || 3001;
const giftlistRouter = require('./routes/giftlistRouter')
const GiftsRouter = require('./routes/GiftsRouter')
const userRouter = require('./routes/userRouter')

const cors = require('cors')
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());

// routes
app.use('/auth', userRouter);

// error handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

// Routers handler

app.use('/giftlists', giftlistRouter);
app.use('/giftlists/:giftListId/gifts/', GiftsRouter);
app.use('/users/:userId/giftlists', giftlistRouter);


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

