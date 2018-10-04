import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '..';

const expect = require('chai').expect;

chai.use(chaiHttp);

const order = {
  userId: 2,
  menuId: 1,
  quantity: 1,
  instruction: 'drop with my neighbour',
};

const adminDetails = {
  email: 'samuel@gmail.com',
  password: 'samuel',
};

const userDetails = {
  email: 'tayo@gmail.com',
  password: 'tayo',
};

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

describe('/POST/api/v1/orders', () => {
  it('Login admin, create a new order, get all orders,get a specific order, update an order', function test(done) {
    this.timeout(20000);
    /**
     *login admin
     */
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

        /**
         *create an order
         */
        const token = res.body.token;
        chai.request(app)
          .post('/api/v1/orders')
          .set('x-access-token', token)
          .send(order)
          .end((err, resp) => {
            expect(resp).to.have.status(201);
            expect(resp.body).to.be.an('object');
            expect(resp.body).to.have.property('status');
            expect(resp.body.status).to.be.a('string');
            expect(resp.body).to.have.property('data');
            expect(resp.body.data).to.have.be.an('object');
            expect(resp.body).to.have.property('message');
            expect(resp.body.message).to.be.a('string');
            // done(err);
          });
        /**
          *gets all orders
         */
        chai.request(app)
          .get('/api/v1/orders')
          .set('x-access-token', token)
          .end((err, response1) => {
            expect(response1).to.have.status(200);
            expect(response1.body).to.be.an('object');
            expect(response1.body).to.have.property('status');
            expect(response1.body.status).to.be.a('string');
            expect(response1.body).to.have.property('data');
            expect(response1.body.data).to.have.be.an('array');
            expect(response1.body).to.have.property('message');
            expect(response1.body.message).to.be.a('string');
            // done(err);
          });

        /**
          *get a specific order with a wrong orderID
        */
        chai.request(app)
          .get('/api/v1/orders/10')
          .set('x-access-token', token)
          .end((err, response2) => {
            expect(response2).to.have.status(404);
            expect(response2.body).to.be.an('object');
            expect(response2.body).to.have.property('message');
            expect(response2.body.message).to.be.a('string');
            // done(err);
          });

        /**
         *get a specific order with correct orderID
         */
        chai.request(app)
          .get('/api/v1/orders/1')
          .set('x-access-token', token)
          .end((err, response3) => {
            expect(response3).to.have.status(200);
            expect(response3.body).to.be.an('object');
            expect(response3.body).to.have.property('status');
            expect(response3.body.status).to.be.a('string');
            expect(response3.body).to.have.property('data');
            expect(response3.body.data).to.have.be.an('object');
            expect(response3.body).to.have.property('message');
            expect(response3.body.message).to.be.a('string');
            // done(err);
          });
        /**
         *update an order with wrong orderID
         */
        chai.request(app)
          .put('/api/v1/orders/10')
          .set('x-access-token', token)
          .send({ orderStatus: 'Complete' })
          .end((err, res) => {
            console.log(res.body);
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            // done(err);
          });
        /**
         *update an order with correct orderID
         */
        chai.request(app)
          .put('/api/v1/orders/1')
          .set('x-access-token', token)
          .send({ orderStatus: 'Complete' })
          .end((err, response) => {
            console.log(res.body);
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('status');
            expect(response.body.status).to.be.a('string');
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.be.an('object');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.a('string');
            done(err);
          });
      });
  });
});
// it('get all orders', function test(done) {
//   this.timeout(20000);
//   chai.request(app)
//     .post('/api/v1/auth/login')
//     .send(adminDetails)
//     .end((err, res) => {
//       console.log(res.body);
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an('object');
//       expect(res.body).to.have.property('token');
//       expect(res.body.token).to.be.a('string');
//       expect(res.body).to.have.property('status');
//       expect(res.body.status).to.be.a('string');
//       expect(res.body).to.have.property('data');
//       expect(res.body.data).to.have.be.an('object');
//       expect(res.body).to.have.property('message');
//       expect(res.body.message).to.be.a('string');

//       const token = res.body.token;
//       chai.request(app)
//         .get('/api/v1/orders')
//         .set('x-access-token', token)
//         .end((err, res) => {
//           console.log(res.body);
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('status');
//           expect(res.body.status).to.be.a('string');
//           expect(res.body).to.have.property('array');
//           expect(res.body.data).to.have.be.an('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message).to.be.a('string');
//           done(err);
//         });
//     });
// });

// it('get a specific order', function test(done) {
//   this.timeout(20000);
//   chai.request(app)
//     .post('/api/v1/auth/login')
//     .send(adminDetails)
//     .end((err, res) => {
//       console.log(res.body);
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an('object');
//       expect(res.body).to.have.property('token');
//       expect(res.body.token).to.be.a('string');
//       expect(res.body).to.have.property('status');
//       expect(res.body.status).to.be.a('string');
//       expect(res.body).to.have.property('data');
//       expect(res.body.data).to.have.be.an('object');
//       expect(res.body).to.have.property('message');
//       expect(res.body.message).to.be.a('string');

//       const token = res.body.token;
//       chai.request(app)
//         .get('/api/v1/orders/10')
//         .set('x-access-token', token)
//         .end((err, res) => {
//           console.log(res.body);
//           expect(res).to.have.status(404);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message).to.be.a('string');
//           done(err);
//         });
//       chai.request(app)
//         .get('/api/v1/orders/1')
//         .set('x-access-token', token)
//         .end((err, res) => {
//           console.log(res.body);
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('status');
//           expect(res.body.status).to.be.a('string');
//           expect(res.body).to.have.property('array');
//           expect(res.body.data).to.have.be.an('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message).to.be.a('string');
//           done(err);
//         });
//     });
// });

// it('update a specific order', function test(done) {
//   this.timeout(20000);
//   chai.request(app)
//     .post('/api/v1/auth/login')
//     .send(adminDetails)
//     .end((err, res) => {
//       console.log(res.body);
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an('object');
//       expect(res.body).to.have.property('token');
//       expect(res.body.token).to.be.a('string');
//       expect(res.body).to.have.property('status');
//       expect(res.body.status).to.be.a('string');
//       expect(res.body).to.have.property('data');
//       expect(res.body.data).to.have.be.an('object');
//       expect(res.body).to.have.property('message');
//       expect(res.body.message).to.be.a('string');

//       const token = res.body.token;
//       chai.request(app)
//         .get('/api/v1/orders/10')
//         .set('x-access-token', token)
//         .send({ orderStatus: 'Complete' })
//         .end((err, res) => {
//           console.log(res.body);
//           expect(res).to.have.status(404);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message).to.be.a('string');
//           done(err);
//         });
//       chai.request(app)
//         .put('/api/v1/orders/1')
//         .set('x-access-token', token)
//         .send({ orderStatus: 'Complete' })
//         .end((err, res) => {
//           console.log(res.body);
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('status');
//           expect(res.body.status).to.be.a('string');
//           expect(res.body).to.have.property('array');
//           expect(res.body.data).to.have.be.an('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message).to.be.a('string');
//           done(err);
//         });
//     });
// });

describe('/GET/api/v1/users/2/orders', () => {
  it('get the order history of a user', function test(done) {
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
          .get('/api/v1/users/4/orders')
          .set('x-access-token', token)
          .end((err, response) => {
            console.log(res.body);
            expect(response).to.have.status(403);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.a('string');
            done(err);
          });
        chai.request(app)
          .get('/api/v1/users/2/orders')
          .set('x-access-token', token)
          .end((err, response) => {
            console.log(res.body);
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('status');
            expect(response.body.status).to.be.a('string');
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.be.an('object');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.a('string');
            done(err);
          });
      });
  });
});

describe('/POST/api/v1/orders', () => {
  it('Login admin, test order validators', function test(done) {
    this.timeout(20000);
    /**
    *login admin
    */
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
      });

    const token = res.body.token;
    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: '2',
        menuId: 1,
        quantity: 1,
        instruction: 'drop with my neighbour',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('UserID must be an integer');
      });
    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: -2,
        menuId: 1,
        quantity: 1,
        instruction: 'drop with my neighbour',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('UserID must be an integer');
      });

    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: 2,
        menuId: '1',
        quantity: 1,
        instruction: 'drop with my neighbour',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('MenuID must be an integer');
      });
    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: 2,
        menuId: -1,
        quantity: 1,
        instruction: 'drop with my neighbour',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('MenuID must be an integer');
      });

    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: 2,
        menuId: 1,
        quantity: '1',
        instruction: 'drop with my neighbour',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Quantity must be an integer');
      });

    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: 2,
        menuId: 1,
        quantity: -1,
        instruction: 'drop with my neighbour',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Quantity must be an integer');
      });

    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: 2,
        menuId: 1,
        quantity: 1,
        instruction: 3,
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Delivery Instructions has to be a string');
      });

    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: 2,
        menuId: 1,
        quantity: 1,
        instruction: '',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot be an empty string or null');
        expect(res.body.message).to.equal('Delivery Instructions has to be a string');
      });

    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        userid: 2,
        menuId: 1,
        quantity: 1,
        instruction: '  ',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('Delivery Instructions has to be a string');
        done(err);
      });
  });
});

describe('/POST/api/v1/orders', () => {
  it('Login admin, test update order validators', function test(done) {
    this.timeout(20000);
    /**
       *login admin
       */
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
      });

    const token = res.body.token;

    chai.request(app)
      .put('/api/v1/orders/1')
      .set('x-access-token', token)
      .send({
        orderStatus: 1,
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Order Status has to be a string');
      });

    chai.request(app)
      .put('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        orderStatus: '',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot be an empty string or null');
        expect(res.body.message).to.equal('Order Status has to be a string');
      });

    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        orderStatus: '  ',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request. Cannot contain white space');
        expect(res.body.message).to.equal('Order Status has to be a string');
      });

    chai.request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({
        orderStatus: 'Completing',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Request');
        expect(res.body.message).to.equal('Order Status must either be New, Processing, Cancelled or Complete');
        done(err);
      });
  });
});
