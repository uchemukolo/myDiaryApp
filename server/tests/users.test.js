import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

export let token;

describe('MyDiary App ::: User', () => {
  describe('Signup ', () => {
    it('should not allow user signup with no email.', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'johndoe',
          firstName: 'Johnny',
          lastName: 'Smithy',
          password: 'abcd1234'
        })
        .end((error, response) => {
          const message = 'Please Enter a valid Email';
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should not allow user signup with no username.', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Johnny',
          lastName: 'Smithy',
          email: 'johndoe@email.com',
          password: 'abcd1234'
        })
        .end((error, response) => {
          const message = 'Please Enter Your Username';
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should not allow user signup with no firstName.', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'johndoe',
          lastName: 'Smithy',
          email: 'johndoe@email.com',
          password: 'abcd1234'
        })
        .end((error, response) => {
          const message = 'Please Enter Your First Name';
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should not allow user signup with no lastName.', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'johndoe',
          firstName: 'Johnny',
          email: 'johndoe@email.com',
          password: 'abcd1234'
        })
        .end((error, response) => {
          const message = 'Please Enter Your Last Name';
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
          firstName: 'Johnny',
          lastName: 'Smithy',
          email: 'johndoe@email.com'
        })
        .end((error, response) => {
          const message = 'Please Enter password';
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
          firstName: 'Johnny',
          lastName: 'Smithy',
          email: 'johndoe@email.com',
          password: 'abcd1234'
        })
        .end((error, response) => {
          const message = 'Signup Successful';
          expect(response.status).to.equal(201);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          expect(response.body).to.haveOwnProperty('token');
          expect(response.body).to.haveOwnProperty('newUser');
          done();
        });
    });
    it('should not allow user signup with same email or username twice.', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'johndoe',
          firstName: 'Johnny',
          lastName: 'Smithy',
          email: 'johndoe@email.com',
          password: 'abcd1234'
        })
        .end((error, response) => {
          const message = 'User Already Exists, Please Login';
          expect(response.status).to.equal(409);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
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
          const message = 'Please enter Your Password!';
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
          const message = 'Please enter Your username or email!';
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
          const message = 'Invalid Credentials, Please try again';
          expect(response.status).to.equal(401);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });
    it('should not let user login with wrong username', (done) => {
      const user = {
        username: 'johndo',
        password: 'abcd1234'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          const message = 'Invalid Username or Email, please provide valid credentials';
          token = response.body.token;
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal(message);
          done();
        });
    });
    it('should let user login with no errors', (done) => {
      const user = {
        username: 'johndoe',
        password: 'abcd1234'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          const message = 'Login Successful!';
          token = response.body.token;
          expect(response.status).to.equal(200);
          expect(response.body).to.haveOwnProperty('message').to.eql(message);
          expect(response.body).to.haveOwnProperty('token');
          expect(response.body).to.haveOwnProperty('userDetails');
          done();
        });
    });
  });
});
