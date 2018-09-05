const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true},
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    personal_fone: { type: String, required: true}
});

module.exports = mongoose.model("User", userSchema);