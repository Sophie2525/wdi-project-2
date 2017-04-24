const express = require('express');
const router  = express.Router();

const venues  = require('../controllers/venues');

router.get('/', (req, res) => res.render('statics/home'));

router.route('/venues')
  .get(venues.index)
  .post(venues.create);
router.route('/venues/new')
  .get(venues.new);
router.route('/venues/:id')
  .get(venues.show)
  .put(venues.update)
  .delete(venues.delete);
router.route('/venues/:id/edit')
  .get(venues.edit);

module.exports = router;
