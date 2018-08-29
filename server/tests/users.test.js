import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const errors = {};

export let token;

describe('MyDiary App ::: User', () => {
  describe('Signup ', () => {
    it('should not allow user signup with no email.', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'johndoe',
          password: 'abcd1234',
          confirmPassword: 'abcd1234'
        })
        .end((error, response) => {
          const message = {
            email: [
              'The email field is required.'
            ]
          };
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
  });
  it('should not allow user signup with no username.', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'johndoe@email.com',
        password: 'abcd1234',
        confirmPassword: 'abcd1234'
      })
      .end((error, response) => {
        const message = {
          username: [
            'The username field is required.'
          ]
        };
        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should not allow user signup with no password.', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        email: 'johndoe@email.com'
      })
      .end((error, response) => {
        const message = {
          password: [
            'The password field is required.'
          ]
        };
        expect(response.status).to.equal(400);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should allow user signup with no errors.', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        email: 'johndoe@email.com',
        password: 'abcd1234',
        confirmPassword: 'abcd1234',

      })
      .end((error, response) => {
        const message = {
          msgs: [
            'Signup Successful'
          ]
        };
        expect(response.status).to.equal(201);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        expect(response.body).to.haveOwnProperty('token');
        done();
      });
  });
  it('should not allow user signup with same email or username twice.', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'johndoe',
        email: 'johndoe@email.com',
        password: 'abcd1234',
        confirmPassword: 'abcd1234',
      })
      .end((error, response) => {
        const message = {
          error: ['User Already Exists, Please Login']
        };
        expect(response.status).to.equal(409);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  describe('Login', () => {
    it('should not let user login with no password', (done) => {
      const user = {
        username: 'johndoe'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          const message = {
            password: [
              'The password field is required.'
            ]
          };
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should not let user login with no username or email', (done) => {
      const user = {
        password: 'abcd1234'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          const message = {
            username: [
              'The username field is required.'
            ]
          };
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should not let user login with wrong credentials', (done) => {
      const user = {
        username: 'johndoe',
        password: 'abcd12'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          const message = {
            error: ['Invalid Credentials, Please try again']
          };
          expect(response.status).to.equal(401);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    // it('should not let user login with wrong username', (done) => {
    //   const user = {
    //     username: 'johndo',
    //     password: 'abcd1234'
    //   };
    //   chai.request(app)
    //     .post('/api/v1/auth/login')
    //     .send(user)
    //     .end((error, response) => {
    //       const message = {
    //         error: ['Invalid Username or Email, please provide valid credentials']
    //       };
    //       token = response.body.token;
    //       expect(response.status).to.equal(401);
    //       expect(response.body.message).to.equal(message);
    //       done();
    //     });
    // });
    it('should let user login with no errors', (done) => {
      const user = {
        username: 'johndoe',
        password: 'abcd1234'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          const message = {
            msgs: [
              'Login Successful!'
            ]
          };
          token = response.body.token;
          expect(response.status).to.equal(200);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          expect(response.body).to.haveOwnProperty('token');
          expect(response.body).to.haveOwnProperty('userDetails');
          done();
        });
    });
  });
  describe('Gets a user profile', () => {
    it('should return 200 for successful', (done) => {
      chai.request(app)
        .get('/api/v1/auth/profile')
        .send()
        .set('token', token)
        .end((error, response) => {
          const message = 'Profile successfully retrieved';
          expect(response.status).to.equal(200);
          expect(response.body).to.haveOwnProperty('profile');
          expect(response.body.message).to.equal(message);
          done();
        });
    });
  });
  describe('Reminder', () => {
    it('should not let user subscribe with no name', (done) => {
      const userReminder = {
        email: 'email@gmail.com'
      };
      chai.request(app)
        .post('/api/v1/auth/reminder')
        .send(userReminder)
        .set('token', token)
        .end((error, response) => {
          const message = {
            name: [
              'The name field is required.'
            ]
          };
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    describe('Reminder', () => {
      it('should not let user subscribe with no email', (done) => {
        const userReminder = {
          name: 'Jane Doe'
        };
        chai.request(app)
          .post('/api/v1/auth/reminder')
          .send(userReminder)
          .set('token', token)
          .end((error, response) => {
            const message = {
              email: [
                'The email field is required.'
              ]
            };
            expect(response.status).to.equal(400);
            expect(response.body).to.haveOwnProperty('message').to.eql(message);
            done();
          });
      });
      it('should allow user subscribe to get daily reminder', (done) => {
        const userReminder = {
          name: 'Jane Doe',
          email: 'email@gmail.com'
        };
        chai.request(app)
          .post('/api/v1/auth/reminder')
          .send(userReminder)
          .set('token', token)
          .end((error, response) => {
            const message = 'Request for Daily Reminder Successful';
            expect(response.status).to.equal(201);
            expect(response.body).to.haveOwnProperty('message').to.eql(message);
            done();
          });
      });
    });
  });
});
