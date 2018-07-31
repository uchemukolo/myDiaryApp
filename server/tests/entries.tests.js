import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);

const { expect } = chai;
let token;


describe('API Integration Tests', () => {
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
  describe('Get All Entries', () => {
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
});
