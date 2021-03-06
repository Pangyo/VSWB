var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema(
    {
        user: {
            username: String,
            password: String,
            email: String,
            phone: String
        }
    }
);

userSchema.methods.generatorPwd = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.confirmPwd = function (password) {
    return bcrypt.compareSync(password, this.user.password);
}

module.exports = mongoose.model('User', userSchema);

