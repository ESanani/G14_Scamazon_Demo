const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Must include first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Must include last name.']
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const User = mongoose.model('User', userSchema);
module.exports = User;