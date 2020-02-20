const app = require('../../../app');
const request = require('supertest');
const tracksModel = require('../tracksModel');
const data = require('../../../data/tracks.json');

describe('Tracks Controller', () => {
  let spy;

  beforeEach(() => {
    spy = jest
      .spyOn(tracksModel, 'getTracksFromFile')
      .mockImplementation(cb => cb(data));
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('responds with tracks json', done => {
    return request(app)
      .get('/all_tracks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return track if ID exists in mocked data', done => {
    request(app)
      .post('/track')
      .send({ id: '101' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(
        200,
        {
          message: 'success',
          track: {
            track_title: 'Bad guy',
            artist: 'Billie Eilish'
          }
        },
        done
      );
  });

  it('should return ERROR if ID exists in mocked data', done => {
    request(app)
      .post('/track')
      .send({ id: '1001' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(
        404,
        {
          message: 'No track found.'
        },
        done
      );
  });
});
