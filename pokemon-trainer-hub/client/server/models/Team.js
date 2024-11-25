const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pokemon: [
    {
      name: String,
      type: [String],
      stats: Object,
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
