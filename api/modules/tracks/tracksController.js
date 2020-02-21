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
        tracks: Object.keys(tracks)
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
    if (!id) {
      const error = new Error('Please provide an ID');

      error.statusCode = statusCodes.NOT_FOUND;

      throw error;
    }

    Track.findById(id, track => {
      if (!track) {
        const error = new Error('No track found.');

        error.statusCode = statusCodes.NOT_FOUND;

        throw error;
      }

      res
        .status(statusCodes.OK)
        .json({ message: serverMessages.SUCCESS, track });
    });
  } catch (err) {
    next(err);
  }
};
