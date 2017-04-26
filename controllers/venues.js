const Venue = require('../models/venue');

function venuesIndex(req, res, next) {
  Venue
    .find()
    .exec()
    .then(venues => {
      return res.render('venues/index', { venues });
    })
    .catch(next);
}

function venuesShow(req, res, next) {
  Venue
    .findById(req.params.id)
    .populate('comments.user')
    .exec()
    .then(venue => {
      if (!venue) {
        return res.render('error', { error: 'No media found.' });
      }
      return res.render('venues/show', { venue });
    })
    .catch(next);
}

function venuesNew(req, res) {
  return res.render('venues/new');
}

function venuesCreate(req, res, next) {
  Venue
    .create(req.body)
    .then(venue => {
      if (!venue) return res.render('error', { error: 'No media was created!' });
      return res.redirect('/venues');
    })
    .catch(next);
}

function venuesEdit(req, res, next) {
  Venue
    .findById(req.params.id)
    .exec()
    .then(venue => {
      if (!venue) {
        return res.render('error', { error: 'No media found.' });
      }
      return res.render('venues/edit', { venue });
    })
    .catch(next);
}

function venuesUpdate(req, res, next) {
  Venue
    .findById(req.params.id)
    .exec()
    .then(venue => {
      if (!venue) {
        return res.render('error', { error: 'No media found.' });
      }
      for (const field in req.body) {
        venue[field] = req.body[field];
      }
      return venue.save();
    })
    .then(venue => {
      if (!venue) {
        return res.render('error', { error: 'Something went wrong during the update.' });
      }
      return res.render('venues/show', { venue });
    })
    .catch(next);
}

function venuesDelete(req, res, next) {
  Venue
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      return res.redirect('/venues');
    })
    .catch(next);
}

function venuesAPI(req, res) {
  Venue.find({}, (err, venues) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ venues: venues });
  });
}

module.exports = {
  index: venuesIndex,
  show: venuesShow,
  new: venuesNew,
  create: venuesCreate,
  edit: venuesEdit,
  update: venuesUpdate,
  delete: venuesDelete,
  api: venuesAPI
};
