const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
})

//Collection name will appear as 'user'
const User = mongoose.model("user", userSchema)

module.exports = User;