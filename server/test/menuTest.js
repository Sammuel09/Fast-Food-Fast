import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '..';

const expect = require('chai').expect;

chai.use(chaiHttp);

const adminDetails = {
  email: 'samuel@gmail.com',
  password: 'samuel',
};

const userDetails = {
  email: 'tayo@gmail.com',
  password: 'tayo',
};

const menuDetails = {
  name: 'Crispy Chicken',
  imageurl: 'https://www.tasteofhome.com/recipes/crispy-fried-chicken/',
  price: '1500',
};

describe('/POST/api/v1/menu', () => {
  it('name should be a string', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        name: 9,
        imageurl: 'https://www.tasteofhome.com/recipes/crispy-fried-chicken/',
        price: '1500',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('name has to be a string');
        done();
      });
  });

  it('name cannot be empty', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        name: '',
        imageurl: 'https://www.tasteofhome.com/recipes/crispy-fried-chicken/',
        price: '1500',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot be empty string or null');
        expect(res.body.message).to.equal('name has to be a string');
        done();
      });
  });

  it('name cannot contain white space', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        name: '   ',
        imageurl: 'https://www.tasteofhome.com/recipes/crispy-fried-chicken/',
        price: '1500',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('name has to be a string');
        done();
      });
  });

  it('imageurl should be a string', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        name: 'Crispy Chicken',
        imageurl: 3,
        price: '1500',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('imageurl has to be a string');
        done();
      });
  });

  it('imageurl cannot be empty', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        name: 'Crispy Chicken',
        imageurl: '',
        price: '1500',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot be empty string or null');
        expect(res.body.message).to.equal('imageurl has to be a string');
        done();
      });
  });

  it('imageurl cannot contain white space', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        name: 'Crispy Chicken',
        imageurl: '    ',
        price: '1500',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('imageurl has to be a string');
        done();
      });
  });

  it('price has to be a number', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        name: 'Crispy Chicken',
        imageurl: 'https://www.tasteofhome.com/recipes/crispy-fried-chicken/',
        price: 'sam',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Price has to be a number');
        done();
      });
  });


  it('create a new menu option', function test(done) {
    this.timeout(20000);
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(adminDetails)
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

        const token = res.body.token;
        console.log(token);
        chai.request(app)
          .post('/api/v1/menu')
          .set('x-access-token', token)
          .send(menuDetails)
          .end((err, res) => {
            console.log(res.body);
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body.status).to.be.a('string');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            done(err);
          });
      });
  });
});


describe('/GET/api/v1/menu', () => {
  it('get all menu options', function test(done) {
    this.timeout(20000);
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
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

        const token = res.body.token;
        console.log(token);
        chai.request(app)
          .get('/api/v1/menu')
          .set('x-access-token', token)
          .end((err, res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body.status).to.be.a('string');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.be.an('array');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            done(err);
          });
      });
  });
});
