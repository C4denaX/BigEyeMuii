const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('useCreateIndex', true); // Para evitar un warning.

const UserSchema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true}
}, {
    timestamps: true
});

module.exports = UserSchema;