import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;


describe('API Integration Tests', () => {
  describe('Get All Entries', () => {
    it('should return 200 for successful', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .send()
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.should.be.a('object'));
          expect(response.body.message).to.equal('Successful');
          expect(response.body).to.haveOwnProperty('error').to.eql(false);
          done();
        });
    });
  });
  describe('Gets a specific  Entry', () => {
    it('should return 200 for successful', (done) => {
      chai.request(app)
        .get('/api/v1/entries/1')
        .send()
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.should.be.a('object'));
          expect(response.body.message).to.equal('Successful')
          expect(response.body).to.haveOwnProperty('error').to.eql(false);
          done();
        });
    });
    it('should return 404 if entry is not found', (done) => {
      chai.request(app)
        .get('/api/v1/entries/6')
        .send()
        .end((err, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Entry not found!')
          expect(response.body).to.haveOwnProperty('error').to.eql(true);
          done();
        });
    });
    it('should return 404 error if entryId params is not valid', (done) => {
      chai.request(app)
      .put('/api/v1/entries/okkkk')
      .send()
      .end((err, response) => {
        const message = 'Parameter must be a number!';
        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });
  });
  describe('Create a New Entry', () => {
    it('should return 201 for successful', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .send({
          userId: 1,
          title: 'Where I Spent 24 Hours in New york',
          mood: 'Happy',
          entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
          date: '11/01/2018'
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.should.be.a('object'));
          expect(response.body.message).to.equal('Entry Created Successfully');
          expect(response.body).to.haveOwnProperty('error').to.eql(false);
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
      .end((err, response) => {
        const message = {
          title: [
            'The title field is required.'
          ]
        };
        expect(response.status).to.equal(400);
        expect(response.body.should.be.a('object'));
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
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
      .end((err, response) => {
        const message = {
          mood: [
            'The mood field is required.'
          ]
        };
        expect(response.status).to.equal(400);
        expect(response.body.should.be.a('object'));
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
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
      .end((err, response) => {
        const message = {
          entry: [
            'The entry field is required.'
          ]
        };
        expect(response.status).to.equal(400);
        expect(response.body.should.be.a('object'));
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });

  describe('Modify an Entry', () => {
    it('should return 200 for successful update', (done) => {
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
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.should.be.a('object'));
        expect(response.body).to.haveOwnProperty('message').to.eql('Update Successful');
        expect(response.body).to.haveOwnProperty('error').to.eql(false);
          done();
        });
    });

    it('return 404 error if entry is not found', (done) => {
      chai.request(app)
        .put('/api/v1/entries/6')
        .send()
        .end((err, response) => {
          const message = 'Entry not found';
          expect(response.status).to.equal(404);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should return 404 error if entryId params is not valid', (done) => {
      chai.request(app)
      .put('/api/v1/entries/okkkk')
      .send()
      .end((err, response) => {
        const message = 'Parameter must be a number!';
        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });
    it('should return 400 if title is not a string', (done) => {
      chai.request(app)
        .put('/api/v1/entries/2')
        .send({
          title:45676,
          userId: 1,
          mood: 'Happy',
          entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
          date: '11/01/2018'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.should.be.a('object'));
          done();
        });
    });
    it('should return 400 if mood is not a string', (done) => {
      chai.request(app)
        .put('/api/v1/entries/2')
        .send({
          title:'My first entry',
          userId: 1,
          mood: 6538,
          entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
          date: '11/01/2018'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.should.be.a('object'));
          done();
        });
    });
    it('should return 400 if mood is not a string', (done) => {
      chai.request(app)
        .put('/api/v1/entries/2')
        .send({
          title:'My first entry',
          userId: 1,
          mood: 'Happy',
          entry: 456987,
          date: '11/01/2018'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.should.be.a('object'));
          done();
        });
    });
  });
});