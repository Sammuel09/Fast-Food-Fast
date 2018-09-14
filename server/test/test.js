import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from "chai-http";

const expect = require("chai").expect;
chai.use(chaiHttp);

import app from "../index.js";

describe("/GET/api/v1/order", () => {
	it("should return all orders", (done) => {
		chai.request(app)
		.get("/api/v1/order")
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.a("array");
			expect(res.body.length).to.be.eql(3);
			done();
		})
	});
});

describe("/POST/api/v1/order", () => {
	it("should place an order", (done) => {
		let order = {
			"fooditem":"Rice and Stew",
			"price": "1000",
			"quantity": "1",
			"address": "194, Herbert Macaulay Way, Yaba",
			"completed": "false"
		}
		chai.request(app)
		.post("/api/v1/order")
		.send(order)
		.end((err,res) => {
			expect(res).to.have.status(201);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("fooditem");
			expect(res.body).to.have.property("price");
			expect(res.body).to.have.property("quantity");
			expect(res.body).to.have.property("address");
			expect(res.body).to.have.property("completed");
			done();
		})
	})
});


describe("/GET/api/v1/order/:orderId", () => {
	it("should return a single order", (done) => {
		chai.request(app)
		.get("/api/v1/order/3")
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("fooditem");
			expect(res.body).to.have.property("price");
			expect(res.body).to.have.property("quantity");
			expect(res.body).to.have.property("address");
			expect(res.body).to.have.property("completed");
			done();
		})
	});
});


describe("/PUT/api/v1/order/:orderId", () => {
	it("should update a single order", (done) => {
		let order = {
			"fooditem":"Rice and Stew",
			"price": "1000",
			"quantity": "1",
			"address": "194, Herbert Macaulay Way, Yaba",
			"completed": "false"
		}
		chai.request(app)
		.post("/api/v1/order")
		.send(order)
		.end((err,res) => {
			expect(res).to.have.status(201);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("fooditem");
			expect(res.body).to.have.property("price");
			expect(res.body).to.have.property("quantity");
			expect(res.body).to.have.property("address");
			expect(res.body).to.have.property("completed");
			done();
		})
	});
});

describe("/DELETE/api/v1/order/:orderId", () => {
	it("should delete a single order", (done) => {
		chai.request(app)
		.delete("/api/v1/order/3")
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("fooditem");
			expect(res.body).to.have.property("price");
			expect(res.body).to.have.property("quantity");
			expect(res.body).to.have.property("address");
			expect(res.body).to.have.property("completed");
			done();
		})
	});
});