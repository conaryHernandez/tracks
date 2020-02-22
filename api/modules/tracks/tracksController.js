const { statusCodes, serverMessages } = require('../../constants');
const Track = require('./tracksModel');
/**
 * @param {Request} req
 * @param {Response} res
 */

exports.getAllTracks = (req, res, next) => {
  try {
    Track.fetchAll(tracks => {
      res.status(statusCodes.OK).json({
        message: serverMessages.SUCCESS,
        tracks
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = statusCodes.SERVER_ERROR;
    }
    next(err);
  }
};

exports.postTrack = (req, res, next) => {
  const { id = null } = req.body;

  try {
    if (!id || typeof id !== 'string') {
      const error = new Error('Please provide a valid ID');

      error.statusCode = statusCodes.NOT_FOUND;

      throw error;
    }

    Track.findById(id, track => {
      if (!track) {
        const error = new Error('No track found.');

        error.statusCode = statusCodes.NOT_FOUND;

        if (error) {
          return next(error);
        }
      }

      res.status(statusCodes.OK).json({ message: serverMessages.SUCCESS, id });
    });
  } catch (err) {
    next(err);
  }
};
