const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    bedroomCount: {
      type: Number,
      required: true,
    },
    bedCount: {
      type: Number,
      required: true,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default: [{}],
    },
    listingPhotoPaths: [{ type: String }], // Array of strings
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlight: {
      type: Number,
      required: true,
    },
    highlightDesc: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
