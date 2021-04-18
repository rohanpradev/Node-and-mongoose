const express = require('express');

const driverRoutes = require('./src/routes/drivers-routes');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/api', (req, res) => res.send('APi works!'));

app.use('/api/drivers', driverRoutes);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
