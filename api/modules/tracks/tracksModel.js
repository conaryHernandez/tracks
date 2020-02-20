const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'tracks.json'
);

const getTracksFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Track {
  constructor(id, track_title, artist) {
    this.id = id;
    this.track_title = track_title;
    this.artist = artist;
  }

  static fetchAll(cb) {
    getTracksFromFile(cb);
  }

  static findById(id, cb) {
    getTracksFromFile(tracks => {
      const track = tracks[id];
      cb(track);
    });
  }
};
