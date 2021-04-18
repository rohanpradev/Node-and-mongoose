const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: { type: [Number], index: '2dsphere' },
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide a email!'],
    validate: {
      validator: function () {
        return this.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      },
      message: 'Please provide a valid email!',
    },
  },
  driving: { type: Boolean, default: false },
  geometry: PointSchema,
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
