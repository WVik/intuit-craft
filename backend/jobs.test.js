const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { describe, it, before, after } = require('mocha');
const app = require('../app'); 
const Jobs = require('../models/Job'); 

chai.use(chaiHttp);
const expect = chai.expect;


before(async () => {
  await Jobs.deleteMany({});
});


after(async () => {
  await mongoose.connection.close();
});

describe('Job API Tests', () => {
  describe('GET /api/jobs', () => {
    it('should get all jobs', (done) => {
      chai
        .request(app)
        .get('/api/jobs')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/jobs', () => {
    it('should create a new job', (done) => {
      const newJob = {
        title: 'Sample Job',
        description: 'This is a sample job description',
        expiry: new Date(),
      };

      chai
        .request(app)
        .post('/api/jobs')
        .send(newJob)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.equal(newJob.title);
          done();
        });
    });
  });

  describe('GET /api/jobs/top10recent', () => {
    it('should get the top 10 recent jobs', (done) => {
      chai
        .request(app)
        .get('/api/jobs/top10recent')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/jobs/top10bidded', () => {
    it('should get the top 10 bidded jobs', (done) => {
      chai
        .request(app)
        .get('/api/jobs/top10bidded')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

});