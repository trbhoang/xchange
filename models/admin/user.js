var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    email: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = {Users};