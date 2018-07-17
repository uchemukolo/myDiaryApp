import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;


describe('API Integration Tests', () => {
  describe('Get All Entries', () => {
    it('return 200 for successful', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('Gets a specific  Entry', () => {
    it('return 200 for successful', (done) => {
      chai.request(app)
        .get('/api/v1/entries/1')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('return 404 if request is not found', (done) => {
      chai.request(app)
        .get('/api/v1/entries/6')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('Create a New Entry', () => {
    it('return 201 for successful', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .send({
          userId: 1,
          title: 'Where I Spent 24 Hours in New york',
          mood: 'Happy',
          entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
          date: '11/01/2018'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Entry Created Successfully')
          done();
        });
    });
  });

  it('should return 400 for no title', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        userId: 1,
        mood: 'Happy',
        entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
        date: '11/01/2018'
      })
      .end((err, res) => {
        const message = {
          title: [
            'The title field is required.'
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });

  it('should return 400 for no mood', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        userId: 1,
        title: 'Where I Spent 24 Hours in New york',
        entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
        date: '11/01/2018'
      })
      .end((err, res) => {
        const message = {
          mood: [
            'The mood field is required.'
          ]
        };
        expect(res.status).to.equal(400);
        // expect(res.body.should.be.a('object'));
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });

  it('should return 400 for no Entry', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        entryId: 1,
        userId: 1,
        title: 'Where I Spent 24 Hours in New york',
        mood: 'Happy',
        date: '11/01/2018'
      })
      .end((err, res) => {
        const message = {
          entry: [
            'The entry field is required.'
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body.should.be.a('object'));
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });

  describe('Modify a Request', () => {
    it('return 200 for successful update', (done) => {
      chai.request(app)
        .put('/api/v1/entries/1')
        .send({
          entryId: 1,
          userId: 1,
          title: 'Where I Spent 24 Hours in New york',
          mood: 'Sad',
          Entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
          date: '11/01/2018'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('return 404 if request is not found', (done) => {
      chai.request(app)
        .put('/api/v1/entries/6')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});