const mongoose = require("mongoose");

// Define the schema for Laptop
const laptopSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    processor: {
      type: String,
      required: true,
    },

    images: [{
      public_id: {
        type: String,
        require: true,
      },

      url: {
        type: String,
        require: true
      }

    }],

    ram: {
      type: Number, // in GB
      required: true,
    },
    storage: {
      type: Number, // in GB
      required: true,
    },
    graphicsCard: {
      type: String,
    },
    screenSize: {
      type: Number, // in inches
    },
    price: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

// Create model
const Laptop = mongoose.model("Laptop", laptopSchema);

module.exports = Laptop;
