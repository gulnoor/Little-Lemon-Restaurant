const { default: mongoose } = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: mongoose.Schema.ObjectId, ref: 'menuItem' }],
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-param-reassign */
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Order = mongoose.model('menuItem', orderSchema);
module.exports = Order;
