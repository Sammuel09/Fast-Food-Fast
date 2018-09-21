import { describe, it } from 'mocha';
// import chai from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const expect = require("chai").expect;
chai.use(chaiHttp);


describe('/GET/api/v1/orders', () => {
  it('should return all orders', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.orders).to.be.a('array');
        expect(res.body.orders.length).to.be.eql(3);
        done();
      });
  });
});

describe('/POST/api/v1/orders', () => {
  it('should place an order', (done) => {
    const order = {
      fooditem: 'Rice and Stew',
      price: 1000,
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.order).to.be.an('object');
        expect(res.body.order).to.have.property('fooditem');
        expect(res.body.order).to.have.property('price');
        expect(res.body.order).to.have.property('quantity');
        expect(res.body.order).to.have.property('address');
        expect(res.body.order).to.have.property('completed');
        done();
      });
  });
});


describe('/GET/api/v1/orders/:orderId', () => {
  it('should return a single order', (done) => {
    chai.request(app)
      .get('/api/v1/orders/3')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.order).to.have.property('fooditem');
        expect(res.body.order).to.have.property('price');
        expect(res.body.order).to.have.property('quantity');
        expect(res.body.order).to.have.property('address');
        expect(res.body.order).to.have.property('completed');
        done();
      });
  });
});


describe('/PUT/api/v1/orders/:orderId', () => {
  it('should update a single order', (done) => {
    const order = {
      fooditem: 'Jollof-Rice',
      price: 1000,
      quantity: 1,
      address: '123, Herbert Macaulay Way, Yaba',
      completed: true,
    };
    chai.request(app)
      .put('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.order).to.be.an('object');
        expect(res.body.order).to.have.property('fooditem');
        expect(res.body.order).to.have.property('price');
        expect(res.body.order).to.have.property('quantity');
        expect(res.body.order).to.have.property('address');
        expect(res.body.order).to.have.property('completed');
        done();
      });
  });
});

describe('/DELETE/api/v1/orders/:orderId', () => {
  it('should delete a single order', (done) => {
    chai.request(app)
      .del('/api/v1/orders/3')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
