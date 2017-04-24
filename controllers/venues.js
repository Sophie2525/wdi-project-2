const Venue = require('../models/venue');

function venuesIndex(req, res) {
  Venue
    .find()
    .exec()
    .then(venues => {
      return res.render('venues/index', { venues });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function venuesShow(req, res) {
  Venue
    .findById(req.params.id)
    .exec()
    .then(venue => {
      if (!venue) {
        return res.render('error', { error: 'No media found.' });
      }
      return res.render('venues/show', { venue });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function venuesNew(req, res) {
  return res.render('venues/new');
}

function venuesCreate(req, res) {
  Venue
    .create(req.body)
    .then(venue => {
      if (!venue) return res.render('error', { error: 'No media was created!' });
      return res.redirect('/venues');
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function venuesEdit(req, res) {
  Venue
    .findById(req.params.id)
    .exec()
    .then(venue => {
      if (!venue) {
        return res.render('error', { error: 'No media found.' });
      }
      return res.render('venues/edit', { venue });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function venuesUpdate(req, res) {
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
    .catch(err => {
      return res.render('error', { error: err });
    });
}

function venuesDelete(req, res) {
  Venue
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      return res.redirect('/venues');
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

module.exports = {
  index: venuesIndex,
  show: venuesShow,
  new: venuesNew,
  create: venuesCreate,
  edit: venuesEdit,
  update: venuesUpdate,
  delete: venuesDelete
};
