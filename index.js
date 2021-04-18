const mongoose = require('mongoose');
const app = require('./app');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect('mongodb://localhost/muber', mongoOptions);

app.listen(3050, () => {
  console.log('Server running on port 3050');
});
