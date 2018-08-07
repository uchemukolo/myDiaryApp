import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);

const { expect } = chai;
let token;


describe('Entry API Integration Tests', () => {
  it('should login the user first', (done) => {
    const user = {
      username: 'johndoe',
      password: 'abcd1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        token = response.body.token;
        done();
      });
  });
  describe('Autentication', () => {
    it('should not allow user access without token', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .end((error, response) => {
          const message = 'Unauthorised User! Please provide a valid token';
          expect(response.status).to.equal(401);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should not allow user access with out a valid token', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .set('token', 'some random stuff')
        .end((error, response) => {
          const message = 'Token could not be authenticated';
          expect(response.status).to.equal(401);
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
        .set('token', token)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('Entry Created Successfully');
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
      .set('token', token)
      .end((error, response) => {
        const message = {
          title: [
            'The title field is required.'
          ]
        };
        expect(response.status).to.equal(400);
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
      .set('token', token)
      .end((error, response) => {
        const message = {
          mood: [
            'The mood field is required.'
          ]
        };
        expect(response.status).to.equal(400);
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
      .set('token', token)
      .end((err, response) => {
        const message = {
          entry: [
            'The entry field is required.'
          ]
        };
        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  describe('Modify an Entry', () => {
    it('should return 400 error if entryId params is not valid', (done) => {
      chai.request(app)
        .put('/api/v1/entries/okkkk')
        .send()
        .set('token', token)
        .end((error, response) => {
          const message = 'Parameter must be a number!';
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should return 400 if title field is not a string', (done) => {
      chai.request(app)
        .put('/api/v1/entries/2')
        .send({
          title: 45676,
          mood: 'Happy',
          entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
        })
        .set('token', token)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('should return 400 if mood field is not a string', (done) => {
      chai.request(app)
        .put('/api/v1/entries/2')
        .send({
          title: 'My first entry',
          mood: 6538,
          entry: 'Set in the former city archive of Cologne, this design hotel is the perfect place to immerse yourself in the history of the city while enjoying a luxurious experience. The suites are to-die-for, and its location in a quiet but central neighborhood puts you right in the middle of the action in minutes.',
        })
        .set('token', token)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('should return 400 if entry field is not a string', (done) => {
      chai.request(app)
        .put('/api/v1/entries/2')
        .send({
          title: 'My first entry',
          mood: 'Happy',
          entry: 456987,
        })
        .set('token', token)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });
  describe('Get All Entries', () => {
    it('should return 200 for successfully getting all entries', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .send()
        .set('token', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Entries successfully retrieved from the database');
          done();
        });
    });
    it('should return 200 if no entry has been made', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .send()
        .set('token', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
  describe('Gets a specific  Entry', () => {
    it('should return 200 for successful', (done) => {
      chai.request(app)
        .get('/api/v1/entries/1')
        .send()
        .set('token', token)
        .end((error, response) => {
          const message = 'Entry successfully retrieved from the database';
          expect(response.status).to.equal(200);
          expect(response.body).to.haveOwnProperty('entry');
          expect(response.body.message).to.equal(message);
          done();
        });
    });
    it('should return 404 if entry is not found', (done) => {
      chai.request(app)
        .get('/api/v1/entries/6')
        .send()
        .set('token', token)
        .end((error, response) => {
          const message = 'Entry not found!';
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal(message);
          done();
        });
    });
    it('should return 400 error if entryId params is not valid', (done) => {
      chai.request(app)
        .get('/api/v1/entries/okkkk')
        .send()
        .set('token', token)
        .end((error, response) => {
          const message = 'Parameter must be a number!';
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
  });
  describe('DELETE Entry', () => {
    it('should not delete an entry is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/167388')
        .send()
        .set('token', token)
        .end((error, response) => {
          const message = 'Entry not found';
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body).to.haveOwnProperty('message').to.equal(message);
          done();
        });
    });
    it('should return 400 if entry Id is invalid', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/okkkkk')
        .send()
        .set('token', token)
        .end((error, response) => {
          const message = 'Parameter must be a number!';
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message').to.equal(message);
          done();
        });
    });
    it('should delete a user entry', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/1')
        .send()
        .set('token', token)
        .end((error, response) => {
          const message = 'Entry successfully deleted';
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('message').to.equal(message);
          done();
        });
    });
  });
});
