const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const { expect } = chai

chai.use(chaiHttp)

describe('Health Endpoint', () => {
  it('should return 200 OK', (done) => {
    chai
      .request(app)
      .get('/health')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.deep.equal({ status: 'OK' })
        done()
      })
  })
})
