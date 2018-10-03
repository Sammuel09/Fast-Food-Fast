import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '..';

const expect = require('chai').expect;

chai.use(chaiHttp);

describe('/POST/api/v1/auth/signup', () => {
  it('should signup a user', function test(done) {
    this.timeout(20000);
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'tayo', email: 'tayo@gmail.com', phone: '09065527200', address: '194 Taayo Taiwo, Yaba', password: 'tayo',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.be.a('string');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.a('string');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(err);
      });
  });

  it('username already exists', function test(done) {
    this.timeout(20000);
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'tayo', email: 'tayo@gmail.com', phone: '09065527200', address: '195 Taayo Taiwo, Yaba', password: 'tayo',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Username already exists. Enter another username');
        done(err);
      });
  });

  it('email already exists', function test(done) {
    this.timeout(20000);
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'tunde', email: 'tayo@gmail.com', phone: '09065527200', address: '196 Taayo Taiwo, Yaba', password: 'tayo',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Email already exists. Enter another email');
        done(err);
      });
  });

  it('Phone Number has to be a number', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'samloco12', email: 'sammie12@gmail.com', phone: 'sam', address: '194 Sam Lokiiii10, Yaba', password: 'samloki10',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Phone Number has to be a number');
        done(err);
      });
  });

  it('username should be a string', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 1, email: 'sammie@gmail.com', phone: '09076827822', address: '194 Sam Loco, Yaba', password: 'samloco',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Username has to be a string');
        done();
      });
  });

  it('username cannot be empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: '', email: 'sammie@gmail.com', phone: '09076827821', address: '194 Sam Loco, Yaba', password: 'samloco',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot be empty string or null');
        expect(res.body.message).to.equal('Username has to be a string');
        done();
      });
  });

  it('username cannot contain white space', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: '  ', email: 'sammie@gmail.com', phone: '09076827821', address: '194 Sam Loco, Yaba', password: 'samloco',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('Username has to be a string');
        done();
      });
  });

  it('email has to be a string', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'samloco2', email: 9, phone: '09076827821', address: '194 Sam Loco, Yaba', password: 'samloco',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Email has to be a string');
        done();
      });
  });

  it('Address has to be a string', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'samloco11', email: 'sammie11@gmail.com', phone: '09076827821', address: 9, password: 'samloco11',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Address has to be a string');
        done();
      });
  });

  it('Address cannot be empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'samloco5', email: 'sammie5@gmail.com', phone: '09076827821', address: '', password: 'samloco',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Address cannot be empty');
        done();
      });
  });

  it('Address cannot be whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'samloco5', email: 'sammie5@gmail.com', phone: '09076827821', address: '   ', password: 'samloco',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('Address has to be a string');
        done();
      });
  });

  it('Password has to be string', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'samloco5', email: 'sammie5@gmail.com', phone: '09076827821', address: '194 Sam Loco, Yaba', password: 8,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Password has to be a string');
        done();
      });
  });

  it('Password cannot be empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'samloco5', email: 'sammie5@gmail.com', phone: '09076827821', address: '194 Sam Loco, Yaba', password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Password cannot be empty');
        done();
      });
  });

  it('Password cannot be whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'samloco5', email: 'sammie5@gmail.com', phone: '09076827821', address: '194 Sam Loco, Yaba', password: '   ',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('Password has to be a string');
        done();
      });
  });

  describe('/POST/api/v1/auth/login', () => {
    it('email does not exist', function test(done) {
      this.timeout(20000);
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'gbemi@gmail.com', password: 'tayo',
        })
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.equal('Email does not exist. Use a valid email');
          done(err);
        });
    });

    it('should login a user', function test(done) {
      this.timeout(20000);
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tayo@gmail.com', password: 'tayo',
        })
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('string');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          done(err);
        });
    });
    
    it('email has to be a string', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 9, password: 'tayo',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Invalid Request');
          expect(res.body.message).to.equal('Email has to be a string');
          done();
        });
    });
    
    it('Password has to be string', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tayo@gmail.com', password: 9,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Invalid Request');
          expect(res.body.message).to.equal('Password has to be a string');
          done();
        });
    });
    it('Password cannot be empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tayo@gmail.com', password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Invalid Request');
          expect(res.body.message).to.equal('Password cannot be empty');
          done();
        });
    });
    it('Password cannot be whitespace', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tayo@gmail.com', password: '  ',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
          expect(res.body.message).to.equal('Password has to be a string');
          done();
        });
    });
  });
});
