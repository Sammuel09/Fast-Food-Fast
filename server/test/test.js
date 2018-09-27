import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const expect = require('chai').expect;

chai.use(chaiHttp);

describe('/GET/api/v1/', () => {
  it('should welcome users to the app', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Welcome to Fast Food App');
        done();
      });
  });
});

describe('/GET/api/v1/orders', () => {
  it('should return all orders', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.orders).to.be.a('array');
        expect(res.body.orders.length).to.be.at.least(2);
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

  it('fooditem should be a string', (done) => {
    const order = {
      fooditem: 1,
      price: 1000,
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Fooditem must be a string');
        done();
      });
  });

  it('fooditem cannot be empty string or null', (done) => {
    const order = {
      fooditem: '',
      price: 1000,
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot be an empty string or null');
        expect(res.body.message).to.equal('Fooditem must be a string');
        done();
      });
  });

  it('fooditem cannot contain white space', (done) => {
    const order = {
      fooditem: '  ',
      price: 1000,
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('Fooditem must be a string');
        done();
      });
  });

  it('price has to be an integer number', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: '1000',
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Price must be an integer');
        done();
      });
  });

  it('price cannot be a negative number', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: -1000,
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Price must be an integer');
        done();
      });
  });

  it('price cannot be a decimal', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000.50,
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Price must be an integer');
        done();
      });
  });

  it('price cannot be a NaN', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: NaN,
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Price must be an integer');
        done();
      });
  });

  it('quantity should be an integer', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000,
      quantity: '1',
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Quantity must be an integer');
        done();
      });
  });

  it('quantity cannot be a negative number', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000,
      quantity: -1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Quantity must be an integer');
        done();
      });
  });

  it('quantity cannot be a decimal', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000,
      quantity: 1.5,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Quantity must be an integer');
        done();
      });
  });

  it('quantity cannot be a NaN', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000,
      quantity: NaN,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Quantity must be an integer');
        done();
      });
  });

  it('address should be a string', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000,
      quantity: 1,
      address: 194,
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Address must be a string');
        done();
      });
  });

  it('address cannot be empty or null', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000,
      quantity: 1,
      address: '',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Address must be a string');
        done();
      });
  });

  it('address cannot contain white space', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000,
      quantity: 1,
      address: '  ',
      completed: false,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('Address must be a string');
        done();
      });
  });

  it('completed should be a boolean', (done) => {
    const order = {
      fooditem: 'Eba and Egusi',
      price: 1000,
      quantity: 1,
      address: '194, Herbert Macaulay Way, Yaba',
      completed: 2,
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Completed must be a boolean');
        done();
      });
  });
});


describe('/GET/api/v1/orders/:id', () => {
  it('should return a single order', (done) => {
    chai.request(app)
      .get('/api/v1/orders/2')
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

describe('/GET/api/v1/orders/:id', () => {
  it('order should be present in database', (done) => {
    chai.request(app)
      .get('/api/v1/orders/5')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        expect(res.body.error).to.equal('Order not found');
        expect(res.body.message).to.equal('The Order with the given ID was not found');
        done();
      });
  });
});


describe('/PUT/api/v1/orders/:id', () => {
  it('should update a single order', (done) => {
    const order = {
      fooditem: 'Jollof-Rice',
      price: 1000,
      quantity: 1,
      address: '123, Herbert Macaulay Way, Yaba',
      completed: true,
    };
    chai.request(app)
      .put('/api/v1/orders/1')
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

describe('/DELETE/api/v1/orders/:id', () => {
  it('should delete a single order', (done) => {
    chai.request(app)
      .delete('/api/v1/orders/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
