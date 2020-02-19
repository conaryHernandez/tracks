/**
 * @param {Request} req
 * @param {Response} res
 */

exports.getAllTracks = (req, res, next) => {
  try {
    res.json({ status: 'success' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postTrack = (req, res, next) => {};
