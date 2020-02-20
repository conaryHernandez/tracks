const fs = require('fs');
const path = require('path');

const p = path.join(
  process.mainModule ? path.dirname(process.mainModule.filename) : `test`,
  'data',
  'tracks.json'
);

module.exports = class Track {
  constructor(id, track_title, artist) {
    this.id = id;
    this.track_title = track_title;
    this.artist = artist;
  }

  static fetchAll(cb) {
    this.getTracksFromFile(cb);
  }

  static findById(id, cb) {
    this.getTracksFromFile(tracks => {
      const track = tracks[id];

      cb(track);
    });
  }

  static getTracksFromFile(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }
};
