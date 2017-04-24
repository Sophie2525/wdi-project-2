const User = require('../models/user');

function staticsIndex(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('statics/home', { users }));
}

module.exports = {
  index: staticsIndex
};
