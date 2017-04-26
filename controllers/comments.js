const Venue = require('../models/venue');

function commentsCreate(req, res, next) {
  Venue
    .findById(req.params.id)
    .exec()
    .then(venue => {
      if (!venue) {
        const err = new Error('Film not found');
        err.status = 404;
        throw err;
      }

      const comment = {
        user: res.locals.user._id,
        body: req.body.body
      };

      venue.comments.push(comment);

      return venue.save();
    })
    .then((venue) => {
      console.log(venue);
      res.redirect(`/venues/${req.params.id}`);
    })
    .catch(next);
}

module.exports = {
  create: commentsCreate
};
