const express = require('express');

const router = express.Router();

const controller = require('./tracksController');

router
  .get('/all_tracks', controller.getAllTracks)
  .post('/track', controller.postTrack);

module.exports = router;
