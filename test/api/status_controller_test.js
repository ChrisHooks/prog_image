'use-strict'

require('../test_helper.js');

describe("GET /status", () => {
  it('should return 200', () => {
    var response = chakram.get("http://localhost:3000/status");
    expect(response).to.have.status(200)
    return chakram.wait();
  });
});


