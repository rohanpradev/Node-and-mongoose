const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/muber_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.connection.once('open', () => done()).on('err', () => console.warn('Warning', err));
});

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.createIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
