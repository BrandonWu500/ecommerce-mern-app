const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    size: [
      {
        info: {
          type: String,
        },
        itemId: {
          type: String,
        },
      },
    ],
    color: [
      {
        info: {
          type: String,
        },
        itemId: {
          type: String,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({
  title: 'text',
});

module.exports = mongoose.model('Product', productSchema);
