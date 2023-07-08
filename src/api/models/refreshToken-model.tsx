// const mongoose = require('mongoose');
// const uniqueValiator = require('mongoose-unique-validator');

// const refreshtokenSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     token: {
//         type: String,
//         required: true
//     },
//     created_at: {
//         type: Number,
//         required: true
//     },
//     expires_at: {
//         type: Number,
//         required: true
//     }
// }, {uniqueValiator: true});

// refreshtokenSchema.plugin(uniqueValiator);

// module.exports = mongoose.model('refreshtokens', refreshtokenSchema, 'refreshtokens');