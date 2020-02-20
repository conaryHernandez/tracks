const Track = require('./tracksModel');
/**
 * @param {Request} req
 * @param {Response} res
 */

exports.getAllTracks = (req, res, next) => {
  try {
    Track.fetchAll(tracks => {
      res.status(200).json({
        message: 'success',
        data: tracks
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postTrack = (req, res, next) => {
  const { id = null } = req.body;

  try {
    if (!id) {
      const error = new Error('No track found.');

      error.statusCode = 404;

      throw error;
    }

    Track.findById(id, track => {
      res.status(200).json({ message: 'success', data: track });
    });
  } catch (err) {
    next(error);
  }
};
