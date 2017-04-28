const express = require('express');
const router  = express.Router();

const venues  = require('../controllers/venues');
const videos  = require('../controllers/videos');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const statics = require('../controllers/statics');
const comments = require('../controllers/comments');


function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  return next();
}

router.route('/')
  .get(statics.index);

router.route('/venues')
  .get(venues.index)
  .post(secureRoute, venues.create);
router.route('/venues/api')
  .get(venues.api);
router.route('/venues/new')
  .get(secureRoute, venues.new);
router.route('/venues/:id')
  .get(venues.show)
  .put(secureRoute, venues.update)
  .delete(secureRoute, venues.delete);
router.route('/venues/:id/edit')
  .get(secureRoute, venues.edit);

router.route('/venues/:id')
  .post(comments.create);

router.route('/videos')
  .get(videos.index)
  .post(secureRoute, videos.create);
router.route('/videos/new')
  .get(secureRoute, videos.new);
router.route('/videos/:id')
  .get(videos.show)
  .put(secureRoute, videos.update)
  .delete(secureRoute, videos.delete);
router.route('/videos/:id/edit')
  .get(secureRoute, videos.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
