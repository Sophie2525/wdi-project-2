const Video = require('../models/video');

function videosIndex(req, res, next) {
  Video
    .find()
    .exec()
    .then(videos => {
      return res.render('videos/index', { videos });
    })
    .catch(next);
}

function videosShow(req, res, next) {
  Video
    .findById(req.params.id)
    .exec()
    .then(video => {
      if (!video) {
        return res.render('error', { error: 'No media found.' });
      }
      return res.render('videos/show', { video });
    })
    .catch(next);
}

function videosNew(req, res) {
  return res.render('videos/new');
}

function videosCreate(req, res, next) {
  Video
    .create(req.body)
    .then(video => {
      if (!video) return res.render('error', { error: 'No media was created!' });
      return res.redirect('/videos');
    })
    .catch(next);
}

function videosEdit(req, res, next) {
  Video
    .findById(req.params.id)
    .exec()
    .then(video => {
      if (!video) {
        return res.render('error', { error: 'No media found.' });
      }
      return res.render('videos/edit', { video });
    })
    .catch(next);
}

function videosUpdate(req, res, next) {
  Video
    .findById(req.params.id)
    .exec()
    .then(video => {
      if (!video) {
        return res.render('error', { error: 'No media found.' });
      }
      for (const field in req.body) {
        video[field] = req.body[field];
      }
      return video.save();
    })
    .then(video => {
      if (!video) {
        return res.render('error', { error: 'Something went wrong during the update.' });
      }
      return res.render('videos/show', { video });
    })
    .catch(next);
}

function videosDelete(req, res, next) {
  Video
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      return res.redirect('/videos');
    })
    .catch(next);
}

module.exports = {
  index: videosIndex,
  show: videosShow,
  new: videosNew,
  create: videosCreate,
  edit: videosEdit,
  update: videosUpdate,
  delete: videosDelete
};
