import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /api/v1/auth/passwordreset', () => {
  it('should not send password reset mail if email is not supplied', (done) => {
    chai.request(app)
      .post('/api/v1/auth/password/resetLink')
      .set('Accept', 'application/json')
      .send({
        email: ''
      })
      .end((error, response) => {
        const message = 'Your Details were not found in the Database';
        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should not send password reset mail if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/password/resetLink')
      .set('Accept', 'application/json')
      .send({
        email: 'invalid'
      })
      .end((error, response) => {
        const message = 'Your Details were not found in the Database';
        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should not send password reset mail if user is not found in the database', (done) => {
    chai.request(app)
      .post('/api/v1/auth/password/resetLink')
      .set('Accept', 'application/json')
      .send({
        email: 'wrongmail@mail.com'
      })
      .end((error, response) => {
        const message = 'Your Details were not found in the Database';
        expect(response.status).to.equal(404);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
  it('should send password reset mail if username or email is valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/password/resetLink')
      .set('Accept', 'application/json')
      .send({
        email: 'johndoe@email.com'
      })
      .end((error, response) => {
        const message = 'Password reset link has been sent to your email';
        expect(response.status).to.equal(200);
        expect(response.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
});
